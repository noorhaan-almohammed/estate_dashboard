import { useState, type ChangeEvent, type FormEvent } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Client {
  id: string;
  title: string;
  date: Date | any; // Allow any type since Firestore dates can be Timestamp objects
  domain: string;
  category: string;
  what_say: string;
  createdAt: any;
}

interface EditClientModalProps {
  onClose: () => void;
  onSuccess: () => void;
  client: Client;
}

export default function EditClientModal({
  onClose,
  onSuccess,
  client,
}: EditClientModalProps) {
  // Helper function to safely convert Firestore date to input date string
  const getDateInputValue = (date: any) => {
    if (!date) return "";
    
    // If date is a Firestore Timestamp
    if (date.toDate) {
      return date.toDate().toISOString().split('T')[0];
    }
    
    // If date is a JavaScript Date object
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    
    // If date is already a string (fallback)
    return date;
  };

  const [formData, setFormData] = useState({
    title: client.title || "",
    date: getDateInputValue(client.date),
    domain: client.domain || "",
    category: client.category || "",
    what_say: client.what_say || "",
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
      const clientRef = doc(db, "clients", client.id);
      await updateDoc(clientRef, {
        ...formData,
        date: formData.date ? new Date(formData.date) : null,
        updatedAt: serverTimestamp(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating client:", err);
      alert("Failed to update client.");
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
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Edit Client</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Domain</label>
            <input
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">What They Say</label>
          <textarea
            name="what_say"
            value={formData.what_say}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded"
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
            disabled={loading}
            className="bg-mainPurple hover:bg-hoverPurple text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Client"}
          </button>
        </div>
      </form>
    </div>
  );
}