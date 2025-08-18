import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Form, { FeaturesInput, FormSection, InputField } from "../../reusecomponents/FormAdd";

interface AddAchievementModalProps {
  onClose: () => void;
  onSuccess: () => void;
}



export default function AddAchievementModal({ onClose, onSuccess }: AddAchievementModalProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
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
    <Form
      title="Add New Achievement"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
    >
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secText mb-2">Title</label>
            <InputField
              name="title"
              placeholder="Achievement title"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secText mb-2">Year</label>
            <InputField
              name="year"
              type="number"
              placeholder="2025"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Description">
        <InputField
          name="description"
          placeholder="Describe the achievement..."
          onChange={handleChange}
          rows={4}
          required
        />
      </FormSection>

      <FormSection title="Features">
        <FeaturesInput
          features={features}
          onFeatureChange={handleFeatureChange}
          onAddFeature={addFeatureField}
          onRemoveFeature={(index) => {
            const updated = [...features];
            updated.splice(index, 1);
            setFeatures(updated);
          }}
        />
      </FormSection>

    </Form>
  );
}