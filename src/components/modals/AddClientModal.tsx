import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface AddClientModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddClientModal({
  onClose,
  onSuccess,
}: AddClientModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    domain: "",
    category: "",
    what_say: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "client"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding client:", err);
      alert("Failed to add client");
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
        <h2 className="text-2xl text-seconderyStar font-bold mb-6">
          Add New Client
        </h2>

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
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Domain</label>
            <input
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 p-2 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-400 p-2 rounded"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">What Say?</label>
          <textarea
            name="what_say"
            value={formData.what_say}
            onChange={handleChange}
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
            {loading ? "Adding..." : "Add Client"}
          </button>
        </div>
      </form>
    </div>
  );
}
