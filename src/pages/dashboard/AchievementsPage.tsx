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
import AchievementsList from "../../components/lists/AchievementsList";
import AddAchievementModal from "../../components/modals/AddAchieveModal";
import EditAchievementModal from "../../components/modals/EditAchieveModal";


export default function AchievementsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const achievementsRef = collection(db, "achievements");
    const q = query(achievementsRef, orderBy("createdAt", "desc"));

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
        console.error("Error fetching achievements:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (achievementId: string) => {
    if (!window.confirm(`Sure delete achievement?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, "achievements", achievementId));
    } catch (error) {
      console.error("Failed to delete achievement:", error);
    }
  };

  return (
    <div className=" p-7 min-h-screen bg-bg">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
        <h2 className="text-4xl font-bold animated-gradient-text">All Achievements</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Achievement
        </button>
      </div>

      {showModal && (
        <AddAchievementModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingAchievement && (
        <EditAchievementModal
          achievement={editingAchievement}
          onClose={() => setEditingAchievement(null)}
          onSuccess={() => {
            setEditingAchievement(null);
          }}
        />
      )}

      {isLoading ? (
        <p className="text-mainPurple text-2xl">Loading...</p>
      ) : (
        <AchievementsList
          items={loadedItems}
          onEdit={(achievement) => setEditingAchievement(achievement)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}