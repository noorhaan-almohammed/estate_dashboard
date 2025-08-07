import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string | number) => {
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
    <div className="fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
      >
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Add Achievement</h2>
        
        <div className="flex justify-between gap-8">
          <div className="flex flex-col w-1/2 gap-2">
            <h3 className="text-xl text-seconderyStar font-bold">Basic info</h3>
            <div className="flex items-center justify-between gap-2">
              <input
                placeholder="Title"
                name="title"
                onChange={handleChange}
                className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded w-full"
                required
              />
              <input
                placeholder="Year"
                name="year"
                type="number"
                onChange={handleChange}
                className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded w-full"
                required
              />
            </div>
          </div>
        </div>

        <h3 className="text-xl text-seconderyStar font-bold">Description & Features</h3>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <textarea
              name="description"
              placeholder="Achievement description"
              onChange={handleChange}
              className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
              required
            />
          </div>
          <div className="flex w-1/2 gap-2">
            <div className="flex flex-col w-full gap-2">
              {features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addFeatureField}
              className="bg-mainPurple text-xl font-bold aspect-square w-11 h-11 flex items-center justify-center text-white p-1 rounded cursor-pointer hover:bg-hoverPurple"
            >
              +
            </button>
          </div>
        </div>

        <h3 className="text-xl text-seconderyStar font-bold">Upload Images</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-fit flex items-center justify-center">
            <input
              className="border-2 text-transparent p-1 rounded bg-mainPurple hover:bg-hoverPurple aspect-square w-11 h-11 cursor-pointer"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              multiple
              onChange={handleImageUpload}
              required
            />
            <label className="absolute text-xl font-bold flex items-center justify-center text-white">
              +
            </label>
          </div>
          {uploading && <p className="text-seconderyStar">Uploading images...</p>}

          <div className="flex gap-2 flex-wrap mt-2">
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-mainPurple hover:bg-hoverPurple cursor-pointer text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Achievement"}
          </button>
        </div>
      </form>
    </div>
  );
}