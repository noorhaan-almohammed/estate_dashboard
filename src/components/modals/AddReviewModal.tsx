import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
    <div className="fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
      >
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Add Review</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border-2 border-gray-400 p-2 rounded"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded"
            rows={4}
            required
          />
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
            disabled={loading || uploading}
          >
            {loading ? "Adding..." : "Add Review"}
          </button>
        </div>
      </form>
    </div>
  );
}