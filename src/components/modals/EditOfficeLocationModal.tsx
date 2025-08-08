import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface OfficeLocation {
  id: string;
  title: string;
  locationDetails: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  createdAt?: any;
}

interface EditOfficeLocationModalProps {
  onClose: () => void;
  onSuccess: () => void;
  location: OfficeLocation;
}

export default function EditOfficeLocationModal({
  onClose,
  onSuccess,
  location,
}: EditOfficeLocationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    locationDetails: "",
    description: "",
    contactPhone: "",
    contactEmail: "",
    contactLocation: "",
  });

  const [loading, setLoading] = useState(false);

  // تعبئة البيانات الحالية عند فتح النموذج
  useEffect(() => {
    if (location) {
      setFormData({
        title: location.title || "",
        locationDetails: location.locationDetails || "",
        description: location.description || "",
        contactPhone: location.contactPhone || "",
        contactEmail: location.contactEmail || "",
        contactLocation: location.contactLocation || "",
      });
    }
  }, [location]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const locationRef = doc(db, "officeLocations", location.id);
      await updateDoc(locationRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating location:", err);
      alert("Failed to update location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Office Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1">Location Details</label>
            <input
              name="locationDetails"
              value={formData.locationDetails}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
              rows={3}
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1">Phone</label>
            <input
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1">Email</label>
            <input
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1">Address</label>
            <input
              name="contactLocation"
              value={formData.contactLocation}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Location"}
          </button>
        </div>
      </form>
    </div>
  );
}