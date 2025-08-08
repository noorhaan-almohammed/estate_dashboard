import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ClientsList from "../../components/lists/ClientsList";
import AddClientModal from "../../components/modals/AddClientModal";
import EditClientModal from "../../components/modals/EditClientModal";

export interface ClientsListData {
  id: number;
  title: string;
  date: string;
  domin: string;
  category: string;
  what_say: string;
}
const ClientsListData: ClientsListData[] = [
  {
    id: 1,
    title: "ABC Corporation",
    date: "Since 2019",
    domin: "Commercial Real Estate",
    category: "Luxury Home Development",
    what_say:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    id: 2,
    title: "ABC Corporation",
    date: "Since 2019",
    domin: "Commercial Real Estate",
    category: "Luxury Home Development",
    what_say:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    id: 3,
    title: "ABC Corporation",
    date: "Since 2019",
    domin: "Commercial Real Estate",
    category: "Luxury Home Development",
    what_say:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
  {
    id: 4,
    title: "ABC Corporation",
    date: "Since 2019",
    domin: "Commercial Real Estate",
    category: "Luxury Home Development",
    what_say:
      "Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.",
  },
];
export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    // setIsLoading(true);
    const clientsRef = collection(db, "clients");
    const q = query(clientsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: any[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        // setClients(items);
        // setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching clients:", error);
        // setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (clientId: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await deleteDoc(doc(db, "clients", clientId));
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <div className="p-6 bg-black">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-mainText">All Clients </h2>
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

      {/* {isLoading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No clients found. Add your first one!
        </p>
      ) : (
        <ClientsList
          items={ClientsListData}
          onEdit={(client) => setEditingClient(client)}
          onDelete={handleDelete}
        />
      )} */}
      <ClientsList
        items={ClientsListData}
        onEdit={(client) => setEditingClient(client)}
        onDelete={handleDelete}
      />
    </div>
  );
}
