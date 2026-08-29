"use server";

import { db } from "@/lib/prisma";

// Function to serialize car data
function serializeCarData(car) {
  return {
    ...car,
    price: car.price ? parseFloat(car.price.toString()) : 0,
    createdAt: car.createdAt?.toISOString(),
    updatedAt: car.updatedAt?.toISOString(),
  };
}

/**
 * Get featured cars for the homepage
 */
export async function getFeaturedCars(limit = 3) {
  try {
    const cars = await db.car.findMany({
      where: {
        featured: true,
        status: "AVAILABLE",
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return cars.map(serializeCarData);
  } catch (error) {
    throw new Error("Error fetching featured cars:" + error.message);
  }
}

// MIME types supported by vision models on OpenRouter
const SUPPORTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

/**
 * Converts a File to base64, normalizing unsupported formats (AVIF, TIFF, BMP, etc.)
 * to JPEG via sharp so vision models always receive a supported image type.
 * Returns { base64, mimeType }.
 */
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  let buffer = Buffer.from(bytes);
  let mimeType = file.type;

  if (!SUPPORTED_IMAGE_TYPES.has(mimeType)) {
    console.log(`Converting unsupported image type "${mimeType}" to JPEG`);
    const sharp = (await import("sharp")).default;
    buffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
    mimeType = "image/jpeg";
  }

  return { base64: buffer.toString("base64"), mimeType };
}

/**
 * Process car image with Z-AI GLM-4.5-Air model
 */
export async function processImageSearch(file) {
  try {
    const { request } = await import("@arcjet/next");
    const aj = (await import("@/lib/arcjet")).default;

    // Get request data for ArcJet
    const req = await request();

    // Check rate limit
    const decision = await aj.protect(req, {
      requested: 1, // Specify how many tokens to consume
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request blocked");
    }

    // Check if API key is available
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key is not configured");
    }

    // Convert image file to base64 (normalizes unsupported types like AVIF → JPEG)
    const { base64: base64Image, mimeType } = await fileToBase64(file);

    // Define the prompt for car search extraction
    const prompt = `
      Analyze this car image and extract the following information for a search query:
      1. Make (manufacturer)
      2. Body type (SUV, Sedan, Hatchback, etc.)
      3. Color

      Format your response as a clean JSON object with these fields:
      {
        "make": "",
        "bodyType": "",
        "color": "",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.
    `;

    // Free vision models to try in order (fallback chain)
    const VISION_MODELS = [
      "google/gemma-4-31b-it:free",
      "google/gemma-4-26b-a4b-it:free",
      "minimax/minimax-m3:free",
      "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    ];

    const messageContent = [
      { type: "text", text: prompt },
      {
        type: "image_url",
        image_url: { url: `data:${mimeType};base64,${base64Image}` },
      },
    ];

    let result = null;
    let lastError = null;

    // Try each model in sequence; skip on 429 (rate limit) or 404 (no endpoint)
    for (const model of VISION_MODELS) {
      console.log(`Trying vision model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: messageContent }],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Model ${model} failed (${response.status}):`, errorText);
        // On rate-limit or missing endpoint, try the next model
        if (response.status === 429 || response.status === 404) {
          lastError = `${model} failed with ${response.status}`;
          continue;
        }
        // Any other error is fatal
        throw new Error(`OpenRouter API request failed (${response.status}): ${errorText}`);
      }

      result = await response.json();

      if (!result.choices || result.choices.length === 0) {
        console.warn(`Model ${model} returned no choices:`, JSON.stringify(result));
        lastError = result.error?.message || `${model} returned no choices`;
        continue;
      }

      console.log(`Successfully used model: ${model}`);
      break; // Got a valid response — stop trying
    }

    if (!result || !result.choices || result.choices.length === 0) {
      throw new Error(`All vision models failed. Last error: ${lastError}`);
    }

    // Extract the JSON response from the AI
    let content = result.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Clean up potential markdown formatting (```json ... ```)
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    // Parse the JSON response
    try {
      const carDetails = JSON.parse(content);

      // Validate the response structure
      if (!carDetails.make && !carDetails.bodyType && !carDetails.color) {
        return {
          success: false,
          error: "Could not identify car details from image",
        };
      }

      return { success: true, data: carDetails };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", content);
      return { success: false, error: "Failed to parse AI response" };
    }
  } catch (error) {
    console.error("AI Search error:", error);
    throw new Error("AI Search error:" + error.message);
  }
}

