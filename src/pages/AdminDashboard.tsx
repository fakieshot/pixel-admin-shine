import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileSetupSidebar } from "@/components/ProfileSetupSidebar";
import { ProfileSetupProgress } from "@/components/ProfileSetupProgress";
import { BusinessProfileForm } from "@/components/forms/BusinessProfileForm";
import { AmenitiesForm } from "@/components/forms/AmenitiesForm";
import { ImageUploadForm } from "@/components/forms/ImageUploadForm";
import { QRCodeSection } from "@/components/QRCodeSection";
import { auth } from "@/lib/firebase";

const steps = [
  { id: 1, title: "Business Profile", description: "Basic information about your business" },
  { id: 2, title: "Amenities", description: "What you offer to guests" },
  { id: 3, title: "Photos", description: "Showcase your business" },
  { id: 4, title: "Preview & Publish", description: "Review and activate your profile" },
];

export default function AdminDashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    amenities: [],
    images: [],
  });
  const [wifiPassword, setWifiPassword] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStepChange = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePublish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const profileData = {
        ...formData,
        wifiPassword,
        checkIn,
        checkOut,
      };

      await submitProfileToBackend(profileData, token);
      toast.success("Your profile has been published successfully!");
      setIsPublished(true);
    } catch (err) {
      console.error("❌ Error publishing profile:", err);
      toast.error("Failed to publish profile");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessProfileForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 2:
        return (
          <AmenitiesForm
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ImageUploadForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Profile</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Business Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-500">Business Name</dt>
                        <dd className="font-medium">{formData.businessName}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Business Type</dt>
                        <dd className="font-medium">{formData.businessType}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Description</dt>
                        <dd className="font-medium">{formData.description}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Check-in Time</dt>
                        <dd className="font-medium">{checkIn}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Check-out Time</dt>
                        <dd className="font-medium">{checkOut}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">WiFi Password</dt>
                        <dd className="font-medium">{wifiPassword}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-gray-500">Address</dt>
                        <dd className="font-medium">{formData.address}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Phone</dt>
                        <dd className="font-medium">{formData.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Email</dt>
                        <dd className="font-medium">{formData.email}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>

            {isPublished && <QRCodeSection businessName={formData.businessName} />}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that all information provided is accurate and up-to-date
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row min-h-screen">
        {!isMobile && (
          <ProfileSetupSidebar 
            currentStep={currentStep} 
            steps={steps} 
            onStepChange={handleStepChange} 
          />
        )}
        
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Set up your guest profile
            </h1>
            <p className="text-gray-500 mb-6">
              Complete these steps to create your guest-facing profile. This will be accessible via a QR code for your guests.
            </p>

            {isMobile && (
              <ProfileSetupProgress 
                currentStep={currentStep} 
                steps={steps} 
                className="mb-6" 
              />
            )}

            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {currentStep < steps.length ? "Next Step" : "Publish Profile"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 🔐 Sends the collected onboarding data to your Cloud Run backend
 */
async function submitProfileToBackend(profileData: any, token: string) {
  try {
    const res = await fetch("https://filoxenia-api-373641445474.europe-west1.run.app/submit-onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const result = await res.json();
    if (result.success) {
      console.log("✅ Profile submitted successfully");
    } else {
      console.error("❌ Backend returned error:", result.error);
    }
  } catch (error) {
    console.error("❌ Failed to submit to Cloud Run:", error);
  }
}
