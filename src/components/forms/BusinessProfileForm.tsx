
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessProfileFormProps {
  formData: {
    businessName: string;
    businessType: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    [key: string]: any;
  };
  updateFormData: (data: Partial<BusinessProfileFormProps["formData"]>) => void;
}

export function BusinessProfileForm({ formData, updateFormData }: BusinessProfileFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Business Information</h3>
        
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium">
            Business Name
          </label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            placeholder="e.g. Coastal View Hotel"
          />
        </div>
        
        <div className="space-y-2">
  <label htmlFor="businessType" className="text-sm font-medium">
    Business Type
  </label>
  <Select
    value={formData.businessType}
    onValueChange={(value) => updateFormData({ businessType: value })}
  >
    <SelectTrigger id="businessType">
      <SelectValue placeholder="Select business type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="hotel">Hotel</SelectItem>
      <SelectItem value="restaurant">Restaurant</SelectItem>
      <SelectItem value="brunch">Brunch</SelectItem>
      <SelectItem value="cafe">Café</SelectItem>
    </SelectContent>
  </Select>
</div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Describe your business and what makes it special..."
            rows={4}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="Full address"
            rows={2}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="contact@yourhotel.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
