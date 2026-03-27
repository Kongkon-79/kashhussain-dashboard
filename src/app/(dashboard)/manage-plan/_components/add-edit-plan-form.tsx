"use client";

import React, { KeyboardEvent, useMemo, useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddEditPlanFormModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    planName?: string;
    price?: string;
    keyFeatures?: string;
  }>({});

  const normalizedPrice = useMemo(() => {
    const parsedPrice = Number.parseFloat(price);

    if (Number.isNaN(parsedPrice)) {
      return "";
    }

    return parsedPrice.toFixed(2);
  }, [price]);

  const resetForm = () => {
    setPlanName("");
    setPrice("");
    setFeatureInput("");
    setKeyFeatures([]);
    setErrors({});
  };

  const handleDialogChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const addFeature = () => {
    const trimmedFeature = featureInput.trim();

    if (!trimmedFeature) {
      return;
    }

    const isDuplicate = keyFeatures.some(
      (feature) => feature.toLowerCase() === trimmedFeature.toLowerCase(),
    );

    if (isDuplicate) {
      toast.error("This feature is already added");
      return;
    }

    setKeyFeatures((prev) => [...prev, trimmedFeature]);
    setFeatureInput("");
    setErrors((prev) => ({ ...prev, keyFeatures: undefined }));
  };

  const handleFeatureKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFeature();
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setKeyFeatures((prev) =>
      prev.filter((feature) => feature !== featureToRemove),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: {
      planName?: string;
      price?: string;
      keyFeatures?: string;
    } = {};

    if (!planName.trim()) {
      nextErrors.planName = "Plan name is required";
    }

    if (!price.trim()) {
      nextErrors.price = "Price is required";
    } else if (Number.isNaN(Number.parseFloat(price))) {
      nextErrors.price = "Enter a valid price";
    } else if (Number.parseFloat(price) < 0) {
      nextErrors.price = "Price cannot be negative";
    }

    if (!keyFeatures.length) {
      nextErrors.keyFeatures = "Add at least one key feature";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fill in the required fields");
      return;
    }

    toast.success("Plan details are ready to save");
    handleDialogChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-[560px] overflow-hidden border-0 bg-white p-0 shadow-[0_24px_80px_rgba(15,23,42,0.18)] !rounded-[20px]">
        <div className="bg-gradient-to-r from-[#EFF5FF] via-white to-[#F3FBF7] px-6 pb-4 pt-6 sm:px-7">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2747A1] text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-[#111827]">
              Create plan
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-[#6B7280]">
              Add a plan name, set the price, and build the feature list one by
              one.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6 sm:px-7">
          <div className="space-y-2">
            <label
              htmlFor="plan-name"
              className="text-sm font-medium text-[#374151]"
            >
              Plan name
            </label>
            <Input
              id="plan-name"
              value={planName}
              onChange={(event) => {
                setPlanName(event.target.value);
                if (errors.planName) {
                  setErrors((prev) => ({ ...prev, planName: undefined }));
                }
              }}
              placeholder="Enter plan name"
              className={cn(
                "h-12 rounded-2xl border-[#D6DDE8] bg-[#FCFCFD] px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:ring-[#2747A1]",
                errors.planName && "border-red-400 focus-visible:ring-red-400",
              )}
            />
            {errors.planName && (
              <p className="text-sm text-red-500">{errors.planName}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="plan-price"
                className="text-sm font-medium text-[#374151]"
              >
                Price
              </label>
              {normalizedPrice && (
                <span className="text-xs font-medium text-[#6B7280]">
                  Preview: ${normalizedPrice}
                </span>
              )}
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#6B7280]">
                $
              </span>
              <Input
                id="plan-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  if (errors.price) {
                    setErrors((prev) => ({ ...prev, price: undefined }));
                  }
                }}
                placeholder="0.00"
                className={cn(
                  "h-12 rounded-2xl border-[#D6DDE8] bg-[#FCFCFD] pl-8 pr-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:ring-[#2747A1]",
                  errors.price && "border-red-400 focus-visible:ring-red-400",
                )}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <label
                  htmlFor="feature-input"
                  className="text-sm font-medium text-[#374151]"
                >
                  Key features
                </label>
                <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                  Type a feature and press Enter or the plus button to add
                  multiple items.
                </p>
              </div>
              <div className="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#2747A1]">
                {keyFeatures.length} added
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Input
                id="feature-input"
                value={featureInput}
                onChange={(event) => setFeatureInput(event.target.value)}
                onKeyDown={handleFeatureKeyDown}
                placeholder="Add key feature"
                className={cn(
                  "h-12 rounded-2xl border-[#D6DDE8] bg-[#FCFCFD] px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:ring-[#2747A1]",
                  errors.keyFeatures &&
                    !keyFeatures.length &&
                    "border-red-400 focus-visible:ring-red-400",
                )}
              />
              <Button
                type="button"
                size="icon"
                onClick={addFeature}
                className="h-12 w-12 shrink-0 rounded-2xl bg-[#2747A1] text-white shadow-sm hover:bg-[#1D3A87]"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {errors.keyFeatures && (
              <p className="text-sm text-red-500">{errors.keyFeatures}</p>
            )}

            <div className="min-h-24 rounded-2xl border border-dashed border-[#D6DDE8] bg-[#F8FAFC] p-3">
              {keyFeatures.length ? (
                <div className="flex flex-wrap gap-2">
                  {keyFeatures.map((feature) => (
                    <Badge
                      key={feature}
                      variant="outline"
                      className="rounded-full border-[#D7E3FF] bg-white px-3 py-2 text-sm font-medium text-[#1F2937]"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-2 rounded-full p-0.5 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-red-500"
                        aria-label={`Remove ${feature}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[72px] items-center justify-center rounded-xl border border-dashed border-transparent text-center text-sm text-[#9CA3AF]">
                  Your added features will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
              className="h-12 rounded-2xl border-[#F3D2D2] bg-[#FFF1F1] text-base font-medium text-[#EF4444] hover:bg-[#FFE4E4] hover:text-[#DC2626]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 rounded-2xl bg-[#E9F8EF] text-base font-medium text-[#16A34A] hover:bg-[#D7F3E1]"
            >
              Save plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditPlanFormModal;
