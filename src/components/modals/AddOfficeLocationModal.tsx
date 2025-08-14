import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FormSection, InputField } from "../../reusecomponents/FormAdd";

interface AddOfficeLocationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddOfficeLocationModal({
  onClose,
  onSuccess,
}: AddOfficeLocationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    locationDetails: "",
    description: "",
    contactPhone: "",
    contactEmail: "",
    contactLocation: "",
  });

  const [loading, setLoading] = useState(false);

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
      await addDoc(collection(db, "officeLocations"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding location:", err);
      alert("Error adding location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add Office Location"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Location Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <InputField
            name="locationDetails"
            value={formData.locationDetails}
            onChange={handleChange}
            placeholder="Location Details"
            required
          />
          <InputField
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="md:col-span-1"
          />
          <InputField
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Email"
            required
            className="md:col-span-1"
          />
          <InputField
            name="contactLocation"
            value={formData.contactLocation}
            onChange={handleChange}
            placeholder="Address"
            required
            className="md:col-span-2"
          />
        </div>
      </FormSection>

      <FormSection title="Description">
        <InputField
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          required
        />
      </FormSection>
    </Form>
  );
}