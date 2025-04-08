
import React from "react";
import { Card } from "@/components/ui/card";

interface QRCodeSectionProps {
  businessName: string;
}

export function QRCodeSection({ businessName }: QRCodeSectionProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
      <div className="text-center space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">Your QR Code is Ready!</h3>
        <p className="text-sm text-gray-600">
          Print this QR code and place it in areas where guests can easily scan it.
        </p>
        
        <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-500">QR Code Placeholder</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Business: <strong>{businessName}</strong></p>
          <p>Profile ID: <strong>FLX-{Math.random().toString(36).substring(2, 8).toUpperCase()}</strong></p>
        </div>
        
        <div className="flex space-x-3 justify-center">
          <button className="text-sm text-blue-600 font-medium">Download</button>
          <button className="text-sm text-blue-600 font-medium">Share</button>
          <button className="text-sm text-blue-600 font-medium">Print</button>
        </div>
      </div>
    </Card>
  );
}
