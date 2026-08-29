"use client";

import { useState, useEffect } from "react";
import { Search, Upload, Camera, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { processImageSearch } from "@/actions/home";
import useFetch from "@/hooks/use-fetch";

export function HomeSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);

  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();
      if (processResult.data.make) params.set("make", processResult.data.make);
      if (processResult.data.bodyType)
        params.set("bodyType", processResult.data.bodyType);
      if (processResult.data.color)
        params.set("color", processResult.data.color);

      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult, router]);

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
        toast.success("Image uploaded successfully");
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image");
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  const handleTextSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
    await processImageFn(searchImage);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleTextSearch}>
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search make, model, electric, sedan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-[120px] sm:pr-[170px] py-6 w-full rounded-2xl border-border bg-background/90 text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9]/50 focus:ring-[#0EA5E9]/20 transition-all text-base"
          />

          {/* AI Camera Icon Button */}
          <div className="absolute right-[54px] sm:right-[100px] flex items-center">
            <button
              type="button"
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isImageSearchActive
                  ? "bg-[#0EA5E9] text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
              title="AI Image Search"
            >
              <Camera size={16} />
              <span className="hidden sm:inline">AI Visual</span>
            </button>
          </div>

          {/* Submit Search Button */}
          <Button
            type="submit"
            className="absolute right-2 rounded-xl px-4 py-5 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
          >
            <span className="hidden sm:inline">Search</span>
            <Search className="sm:hidden w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* AI Visual Search Modal/Dropzone */}
      {isImageSearchActive && (
        <div className="mt-4 p-5 rounded-2xl bg-card border border-[#0EA5E9]/30 text-card-foreground backdrop-blur-xl animate-slide-up shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
              <Sparkles className="h-4 w-4" />
              <span>AI Visual Car Search</span>
            </div>
            <button
              onClick={() => setIsImageSearchActive(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleImageSearch} className="space-y-4">
            <div className="border-2 border-dashed border-border hover:border-[#0EA5E9]/50 rounded-xl p-6 text-center transition-colors bg-muted/20">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <div className="relative h-40 w-full max-w-xs mb-3 rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview("");
                      toast.info("Image removed");
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <div className="p-3 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] mb-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-foreground font-medium text-sm mb-1">
                      {isDragActive && !isDragReject
                        ? "Drop the car image here"
                        : "Upload a car image to find matches"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-400 text-xs mb-1">Invalid image file</p>
                    )}
                    <p className="text-muted-foreground text-xs">
                      Supports JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {imagePreview && (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-xl py-5 hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all"
                disabled={isUploading || isProcessing}
              >
                {isUploading
                  ? "Uploading..."
                  : isProcessing
                  ? "Analyzing with Carvix AI..."
                  : "Search with this Image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
