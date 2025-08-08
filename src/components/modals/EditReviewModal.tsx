import { useState, type ChangeEvent, type FormEvent } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Review {
  id: string;
  name: string;
  country: string;
  city: string;
  title: string;
  description: string;
  rating: number;
  profileimage: string;
  createdAt: any;
}

interface EditReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
  review: Review;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditReviewModal({
  onClose,
  onSuccess,
  review,
}: EditReviewModalProps) {
  const [formData, setFormData] = useState({
    name: review.name || "",
    country: review.country || "",
    city: review.city || "",
    title: review.title || "",
    description: review.description || "",
    rating: review.rating || 5,
  });
  const [profileImage, setProfileImage] = useState(review.profileimage || "");
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
      const reviewRef = doc(db, "reviews", review.id);
      await updateDoc(reviewRef, {
        ...formData,
        profileimage: profileImage,
        updatedAt: serverTimestamp(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating review:", err);
      alert("Failed to update review.");
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
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Edit Review</h2>
        
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
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile Preview" 
                className="w-16 h-16 rounded-full object-cover mt-2"
              />
            )}
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
            disabled={loading || uploading}
            className="bg-mainPurple hover:bg-hoverPurple text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Review"}
          </button>
        </div>
      </form>
    </div>
  );
}