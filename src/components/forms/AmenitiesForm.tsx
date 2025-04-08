
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface AmenitiesFormProps {
  formData: {
    amenities: string[];
    [key: string]: any;
  };
  updateFormData: (data: Partial<AmenitiesFormProps["formData"]>) => void;
}

// Common amenities for hospitality businesses
const amenitiesOptions = [
  { id: "wifi", label: "Free WiFi" },
  { id: "parking", label: "Free Parking" },
  { id: "breakfast", label: "Complimentary Breakfast" },
  { id: "pool", label: "Swimming Pool" },
  { id: "spa", label: "Spa Services" },
  { id: "fitness", label: "Fitness Center" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar/Lounge" },
  { id: "room_service", label: "Room Service" },
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "business_center", label: "Business Center" },
  { id: "ev_charging", label: "EV Charging Station" },
  { id: "airport_shuttle", label: "Airport Shuttle" },
  { id: "concierge", label: "Concierge Service" },
  { id: "accessibility", label: "Accessibility Features" },
  { id: "ac", label: "Air Conditioning" },
  { id: "beach_access", label: "Beach Access" },
  { id: "laundry", label: "Laundry Service" },
];

export function AmenitiesForm({ formData, updateFormData }: AmenitiesFormProps) {
  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter(id => id !== amenityId)
      : [...formData.amenities, amenityId];
    
    updateFormData({ amenities: newAmenities });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Amenities & Services</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select all amenities and services that your business offers to guests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {amenitiesOptions.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
            <Checkbox
              id={`amenity-${amenity.id}`}
              checked={formData.amenities.includes(amenity.id)}
              onCheckedChange={() => handleAmenityToggle(amenity.id)}
            />
            <label
              htmlFor={`amenity-${amenity.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {amenity.label}
            </label>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Additional amenities</h4>
        <p className="text-sm text-gray-500 mb-3">
          Add any custom amenities not listed above.
        </p>
        <input
          type="text"
          className="w-full p-2 border rounded-md text-sm"
          placeholder="Type custom amenity and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              e.preventDefault();
              const customAmenityId = `custom_${e.currentTarget.value.trim().toLowerCase().replace(/\s+/g, '_')}`;
              if (!formData.amenities.includes(customAmenityId)) {
                updateFormData({ 
                  amenities: [...formData.amenities, customAmenityId]
                });
              }
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
