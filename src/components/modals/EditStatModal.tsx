import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Stat {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  createdAt: any;
  updatedAt?: any;
}

interface EditStatModalProps {
  onClose: () => void;
  onSuccess: () => void;
  stat: Stat;
}

export default function EditStatModal({ onClose, onSuccess, stat }: EditStatModalProps) {
  const [formData, setFormData] = useState({
    title: stat.title || "",
    value: stat.value || "",
    description: stat.description || "",
    icon: stat.icon || "",
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
      const statRef = doc(db, "stats", stat.id);
      await updateDoc(statRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating stat:", err);
      alert("Failed to update stat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#3333334e] flex justify-center items-center z-50">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-[90%] max-w-2xl"
      >
        <h2 className="text-2xl text-seconderyStar font-bold mb-6">Edit Statistic</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Icon (FontAwesome class)</label>
          <input
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="fas fa-chart-line"
            className="w-full border-2 border-gray-400 p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border-2 border-gray-400 p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-mainPurple text-white px-4 py-2 rounded hover:bg-hoverPurple"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Statistic"}
          </button>
        </div>
      </form>
    </div>
  );
}