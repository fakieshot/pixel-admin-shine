
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadFormProps {
  formData: {
    images: string[];
    [key: string]: any;
  };
  updateFormData: (data: Partial<ImageUploadFormProps["formData"]>) => void;
}

export function ImageUploadForm({ formData, updateFormData }: ImageUploadFormProps) {
  // This would be replaced with actual image upload functionality
  const handleAddImage = () => {
    // In a real implementation, this would handle the actual file upload
    // For now, we're just adding a placeholder URL
    const newImage = `https://source.unsplash.com/random/300x200?hotel&sig=${Date.now()}`;
    updateFormData({ images: [...formData.images, newImage] });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    updateFormData({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add photos that showcase your business. High-quality images help attract guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formData.images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-[4/3] rounded-md overflow-hidden border border-gray-200 group"
          >
            <img 
              src={image} 
              alt={`Business photo ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <button 
          onClick={handleAddImage}
          className={cn(
            "aspect-[4/3] rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-gray-400 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          )}
        >
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="h-10 w-10 mb-2" />
            <span className="font-medium text-sm mb-1">Upload Image</span>
            <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
          </div>
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-6">
        <div className="flex">
          <div className="mr-3 flex-shrink-0">
            <ImageIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-sm text-blue-800">
            <h4 className="font-medium mb-1">Photo tips</h4>
            <ul className="list-disc pl-4 space-y-1 text-blue-700 text-xs">
              <li>Upload at least 5 high-quality photos</li>
              <li>Include photos of different areas and amenities</li>
              <li>Make sure your main photo is eye-catching</li>
              <li>Avoid using heavily filtered or edited photos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
