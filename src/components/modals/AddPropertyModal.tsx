import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FeaturesInput, FormSection, ImageUpload, InputField } from "../../reusecomponents/FormAdd";

interface AddPropertyModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function AddPropertyModal({
  onClose,
  onSuccess,
}: AddPropertyModalProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureField = () => {
    setFeatures([...features, ""]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" && !isNaN(Number(value)) && value.trim() !== ""
        ? Number(value)
        : value,
    }));
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "properties");

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const urls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      setImageUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };


  const handleRemoveImage = (index: number) => {
    const updated = [...imageUrls];
    updated.splice(index, 1);
    setImageUrls(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (imageUrls.length === 0) {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        imageUrls,
        features: features.filter((f) => f.trim() !== ""),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "properties"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Error adding property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add Property"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8">
        <FormSection title="Basic info" className="w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <InputField
              placeholder="Type"
              name="type"
              onChange={handleChange}
            />
            <InputField
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <InputField
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
            <InputField
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
            />
          </div>
        </FormSection>

        <FormSection title="Static info" className="w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <InputField
              name="bedrooms"
              type="number"
              placeholder="Bedrooms"
              onChange={handleChange}
            />
            <InputField
              name="bathrooms"
              type="number"
              placeholder="Bathrooms"
              onChange={handleChange}
            />
            <InputField
              name="area"
              type="number"
              placeholder="Area (m²)"
              onChange={handleChange}
            />
            <InputField
              name="build_year"
              type="number"
              placeholder="Build year"
              onChange={handleChange}
            />
          </div>
        </FormSection>
      </div>

      <FormSection title="Description & Features">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-1/2 space-y-4">
            <InputField
              placeholder="Tag Description"
              name="tag_description"
              onChange={handleChange}
            />
            <InputField
              name="description"
              placeholder="Property description"
              onChange={handleChange}
              rows={4}
              required
            />
            <InputField
              name="feature_description"
              placeholder="Feature Property description"
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="w-full lg:w-1/2">
            <FeaturesInput
              features={features}
              onFeatureChange={handleFeatureChange}
              onAddFeature={addFeatureField}
              onRemoveFeature={(index) => {
                const updated = [...features];
                updated.splice(index, 1);
                setFeatures(updated);
              }}
            />
          </div>
        </div>
      </FormSection>

      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8">
        <FormSection title="Additional Fees" className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              name="transfer_tax"
              type="number"
              placeholder="Transfer Tax"
              onChange={handleChange}
            />
            <InputField
              name="legal_fees"
              type="number"
              placeholder="Legal Fees"
              onChange={handleChange}
            />
            <InputField
              name="inspection"
              type="number"
              placeholder="Home Inspection"
              onChange={handleChange}
            />
            <InputField
              name="insurance"
              type="number"
              placeholder="Property Insurance"
              onChange={handleChange}
            />
            <InputField
              name="mortgage_fees"
              placeholder="Mortgage Fees"
              onChange={handleChange}
            />
            <InputField
              name="monthly_taxes"
              type="number"
              placeholder="Property Taxes"
              onChange={handleChange}
            />
            <InputField
              name="hoa_fee"
              type="number"
              placeholder="HOA Fee"
              onChange={handleChange}
            />
          </div>
        </FormSection>

        <FormSection title="Total Initial Costs" className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              name="listing_price"
              type="number"
              placeholder="Listing Price"
              onChange={handleChange}
            />
            <InputField
              name="total_additional_fees"
              type="number"
              placeholder="Fees Total"
              onChange={handleChange}
            />
            <InputField
              name="down_payment"
              type="number"
              placeholder="Down Payment"
              onChange={handleChange}
            />
            <InputField
              name="mortgage_amount"
              type="number"
              placeholder="Mortgage Amount"
              onChange={handleChange}
            />
            <InputField
              name="expense_taxes"
              type="number"
              placeholder="Expense Taxes"
              onChange={handleChange}
            />
            <InputField
              name="expense_insurance"
              type="number"
              placeholder="Expense Insurance"
              onChange={handleChange}
              required
            />
            <InputField
              name="expense_mortgage"
              placeholder="Expense Mortgage"
              onChange={handleChange}
              required
            />
          </div>
        </FormSection>
      </div>

      <FormSection title="Upload Images">
        <ImageUpload
          onImageUpload={handleImageUpload}
          imageUrls={imageUrls}
          uploading={uploading}
          onRemoveImage={handleRemoveImage}
        />
      </FormSection>
    </Form>
  );
}