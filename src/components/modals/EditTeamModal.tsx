import { useState, type ChangeEvent, type FormEvent } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  profileImage: string;
  createdAt: any;
}

interface EditTeamModalProps {
  onClose: () => void;
  onSuccess: () => void;
  member: TeamMember;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditTeamModal({
  onClose,
  onSuccess,
  member,
}: EditTeamModalProps) {
  const [formData, setFormData] = useState({
    name: member.name || "",
    position: member.position || "",
  });
  const [profileImage, setProfileImage] = useState(member.profileImage || "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      formData.append("folder", "team");

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
      const memberRef = doc(db, "team", member.id);
      await updateDoc(memberRef, {
        ...formData,
        profileImage,
        updatedAt: serverTimestamp(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating team member:", err);
      alert("Failed to update team member.");
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
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Edit Team Member</h2>
        
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
            <label className="mb-1 text-sm font-medium">Position</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col md:col-span-2">
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
                className="w-32 h-32 rounded-full object-cover mt-2 mx-auto"
              />
            )}
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
            disabled={loading || uploading}
            className="bg-mainPurple hover:bg-hoverPurple text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Member"}
          </button>
        </div>
      </form>
    </div>
  );
}