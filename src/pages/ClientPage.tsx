import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import InfoItem from "../components/InfoItem";

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const docRef = doc(db, "clients", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setClient({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!client)
    return <p className="text-center text-red-600 mt-8">Client not found.</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/clients-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple"
        >
          Back to list
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{client.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <InfoItem label="Domain" value={client.domain} />
          <InfoItem label="Category" value={client.category} />
          <InfoItem
            label="Date"
            value={
              client.date?.seconds
                ? new Date(client.date.seconds * 1000).toLocaleDateString()
                : client.date instanceof Date
                ? client.date.toLocaleDateString()
                : "-"
            }
          />
          <InfoItem
            label="Created At"
            value={
              client.createdAt?.seconds
                ? new Date(client.createdAt.seconds * 1000).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">What They Say</h2>
        <p className="text-gray-700 whitespace-pre-line">{client.what_say}</p>
      </div>
    </div>
  );
}