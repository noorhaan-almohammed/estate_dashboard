import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FormSection, InputField } from "../../reusecomponents/FormAdd";

interface AddStatModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStatModal({ onClose, onSuccess }: AddStatModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "stats"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding stat:", err);
      alert("Failed to add stat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add New Statistic"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Statistic Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <InputField
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="Value"
            required
          />
        </div>
      </FormSection>

      <FormSection title="Additional Information">
        <InputField
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
        />
        <InputField
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="Icon (optional)"
        />
      </FormSection>
    </Form>
  );
}