import React from "react";

interface Props {
  businessType: string;
  selectedTemplate: string;
  updateFormData: (data: Partial<any>) => void;
}

const templatesByType: Record<string, { id: string; label: string; path: string }[]> = {
  hotel: [
    { id: "hotel-1", label: "Hotel Layout 1", path: "/templates/hotel/hotel-1/index.html" },
    { id: "hotel-2", label: "Hotel Layout 2", path: "/templates/hotel/hotel-2/index.html" },
  ],
  restaurant: [
    { id: "rest-1", label: "Restaurant 1", path: "/templates/restaurant/rest-1/index.html" },
    { id: "rest-2", label: "Restaurant 2", path: "/templates/restaurant/rest-2/index.html" },
  ],
  brunch: [
    { id: "brunch-1", label: "Brunch 1", path: "/templates/brunch/brunch-1/index.html" },
    { id: "brunch-2", label: "Brunch 2", path: "/templates/brunch/brunch-2/index.html" },
  ],
  cafe: [
    { id: "cafe-1", label: "Café 1", path: "/templates/cafe/cafe-1/index.html" },
    { id: "cafe-2", label: "Café 2", path: "/templates/cafe/cafe-2/index.html" },
  ],
};

export function TemplateSelectionForm({
  businessType,
  selectedTemplate,
  updateFormData,
}: Props) {
  const options = templatesByType[businessType] || [];

  if (!businessType) {
    return <p className="text-red-500">Please select your business type first.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pick a Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => updateFormData({ selectedTemplate: tpl.id })}
            className={`border rounded p-2 cursor-pointer ${
              selectedTemplate === tpl.id ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <iframe
              src={`http://localhost:5000${tpl.path}#/`}
              style={{ width: "100%", height: 400, border: "none" }}
              title={tpl.label}
            />
            <p className="mt-2 text-center text-sm">{tpl.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
