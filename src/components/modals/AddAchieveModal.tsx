import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FeaturesInput, FormSection, ImageUpload, InputField } from "../../reusecomponents/FormAdd";

interface AddAchievementModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function AddAchievementModal({ onClose, onSuccess }: AddAchievementModalProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "achievements");

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const urls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      setImageUrls(urls);
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

  const handleSubmit = async (e: React.FormEvent) => {
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

      await addDoc(collection(db, "achievements"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding achievement:", err);
      alert("Error adding achievement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add New Achievement"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secText mb-2">Title</label>
            <InputField
              name="title"
              placeholder="Achievement title"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secText mb-2">Year</label>
            <InputField
              name="year"
              type="number"
              placeholder="2023"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Description">
        <InputField
          name="description"
          placeholder="Describe the achievement..."
          onChange={handleChange}
          rows={4}
          required
        />
      </FormSection>

      <FormSection title="Features">
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
      </FormSection>

      <FormSection title="Images">
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