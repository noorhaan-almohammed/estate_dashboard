import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import InfoItem from "../components/InfoItem";

export default function StatPage() {
  const { id } = useParams<{ id: string }>();
  const [stat, setStat] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const docRef = doc(db, "stats", id!);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStat({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching stat:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStat();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!stat) return <p className="text-center text-red-600 mt-8">Statistic not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/stats-dashboard"
          className="inline-block bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          Back to Statistics
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-6 mb-8">
   
          <div>
            <h1 className="text-3xl font-bold">{stat.title}</h1>
            <p className="text-4xl font-bold text-mainPurple mt-2">{stat.value}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoItem label="Created At" 
            value={stat.createdAt?.seconds 
              ? new Date(stat.createdAt.seconds * 1000).toLocaleString() 
              : "-"} 
          />
          {stat.updatedAt && (
            <InfoItem label="Updated At" 
              value={stat.updatedAt?.seconds 
                ? new Date(stat.updatedAt.seconds * 1000).toLocaleString() 
                : "-"} 
            />
          )}
        </div>

        {stat.description && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{stat.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}