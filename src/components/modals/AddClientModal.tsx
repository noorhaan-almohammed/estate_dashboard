import { useState, type ChangeEvent, type FormEvent } from "react";
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
    <div className="fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
      >
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Add Client</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <input
            placeholder="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <input
            placeholder="Domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />
          
          <input
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What They Say
          </label>
          <textarea
            name="what_say"
            value={formData.what_say}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 p-2 rounded"
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
            className="bg-mainPurple hover:bg-hoverPurple cursor-pointer text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Client"}
          </button>
        </div>
      </form>
    </div>
  );
}