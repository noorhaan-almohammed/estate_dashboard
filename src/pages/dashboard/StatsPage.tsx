import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import StatsList from "../../components/lists/StatsList";
import AddStatModal from "../../components/modals/AddStatModal";
import EditStatModal from "../../components/modals/EditStatModal";

export default function StatsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const statsRef = collection(db, "stats");
    const q = query(statsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setStats(items);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching stats:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (statId: string) => {
    if (!window.confirm("Are you sure you want to delete this statistic?")) return;
    
    try {
      await deleteDoc(doc(db, "stats", statId));
    } catch (error) {
      console.error("Failed to delete stat:", error);
    }
  };

  return (
    <div className="p-7 min-h-screen bg-bg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold animated-gradient-text">Statistics Dashboard</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Statistic
        </button>
      </div>

      {showModal && (
        <AddStatModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingStat && (
        <EditStatModal
          stat={editingStat}
          onClose={() => setEditingStat(null)}
          onSuccess={() => setEditingStat(null)}
        />
      )}

      {isLoading ? (
        <p>Loading statistics...</p>
      ) : stats.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No statistics found. Add your first one!</p>
      ) : (
        <StatsList
          items={stats}
          onEdit={(stat) => setEditingStat(stat)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}