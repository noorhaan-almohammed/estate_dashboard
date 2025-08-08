import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import ClientsList from "../../components/lists/ClientsList";
import AddClientModal from "../../components/modals/AddClientModal";
import EditClientModal from "../../components/modals/EditClientModal";

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const clientsRef = collection(db, "clients");
    const q = query(clientsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: any[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setLoadedItems(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching clients:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (clientId: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "clients", clientId));
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Clients</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Client
        </button>
      </div>

      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingClient && (
        <EditClientModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onSuccess={() => setEditingClient(null)}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ClientsList
          items={loadedItems}
          onEdit={(client) => setEditingClient(client)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}