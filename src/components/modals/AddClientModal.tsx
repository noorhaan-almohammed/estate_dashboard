import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, {  FormSection, InputField } from "../../reusecomponents/FormAdd";

interface AddClientModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddClientModal({ onClose, onSuccess }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    domain: "",
    category: "",
    what_say: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const payload = {
        ...formData,
        date: new Date(formData.date),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "clients"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding client:", err);
      alert("Error adding client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      title="Add Client"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Client Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <InputField
            name="date"
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <InputField
            name="domain"
            placeholder="Domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />
          <InputField
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </FormSection>

      <FormSection title="Testimonial">
        <InputField
          name="what_say"
          placeholder="What they say..."
          value={formData.what_say}
          onChange={handleChange}
          rows={4}
          required
        />
      </FormSection>
    </Form>
  );
}