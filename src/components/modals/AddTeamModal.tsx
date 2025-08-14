import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FormSection, InputField, ImageUpload } from "../../reusecomponents/FormAdd";

interface AddTeamModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function AddTeamModal({
  onClose,
  onSuccess,
}: AddTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const payload = {
        ...formData,
        profileImage,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "team"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding team member:", err);
      alert("Error adding team member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add Team Member"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading || uploading}
    >
      <FormSection title="Member Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <InputField
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position"
            required
          />
        </div>
      </FormSection>

      <FormSection title="Profile Image">
        <ImageUpload
          onImageUpload={handleImageUpload}
          imageUrls={profileImage ? [profileImage] : []}
          uploading={uploading}
          onRemoveImage={() => setProfileImage("")}
          multiple={false}
        />
      </FormSection>
    </Form>
  );
}