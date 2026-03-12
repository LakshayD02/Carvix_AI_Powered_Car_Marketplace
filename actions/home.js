"use server";

import { db } from "@/lib/prisma";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

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

// Function to convert File to base64
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

/**
 * Process car image with Z-AI GLM-4.5-Air model
 */
export async function processImageSearch(file) {
  try {
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
    if (!process.env.ZAI_API_KEY) {
      throw new Error("Z-AI API key is not configured");
    }

    // Convert image file to base64
    const base64Image = await fileToBase64(file);

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

    // Prepare the request payload for Z-AI API
    const payload = {
      model: "glm-4.5-air:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    };

    // Make API request to Z-AI
    const response = await fetch("https://api.z.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ZAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Z-AI API error:", errorData);
      throw new Error(`Z-AI API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Extract the JSON response from the AI
    const content = result.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response
    try {
      const carDetails = JSON.parse(content);

      // Validate the response structure
      if (!carDetails.make && !carDetails.bodyType && !carDetails.color) {
        return {
          success: false,
          error: "Could not identify car details from image"
        };
      }

      // Return success response with data
      return {
        success: true,
        data: carDetails,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", content);
      return {
        success: false,
        error: "Failed to parse AI response",
      };
    }
  } catch (error) {
    console.error("AI Search error:", error);
    throw new Error("AI Search error:" + error.message);
  }
}
