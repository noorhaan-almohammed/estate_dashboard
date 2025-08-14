import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FormSection, ImageUpload, InputField } from "../../reusecomponents/FormAdd";

interface AddReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function AddReviewModal({
  onClose,
  onSuccess,
}: AddReviewModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    title: "",
    description: "",
    rating: 5,
  });
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "reviews");

      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.secure_url) {
        setProfileImage(data.secure_url);
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        profileimage: profileImage,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "reviews"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Error adding review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add Review"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Review Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <InputField
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <InputField
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-secText mb-2">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full bg-grayMedium border border-borderColor text-mainText rounded-lg px-4 py-3 focus:ring-2 focus:ring-mainPurple focus:border-transparent"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <InputField
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-secText mb-2">Profile Image</label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              imageUrls={profileImage ? [profileImage] : []}
              uploading={uploading}
              onRemoveImage={() => setProfileImage("")}
              multiple={false}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Review Content">
        <InputField
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          required
        />
      </FormSection>
    </Form>
  );
}