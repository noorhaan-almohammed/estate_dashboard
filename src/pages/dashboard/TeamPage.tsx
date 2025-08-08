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
import TeamList from "../../components/lists/TeamList";
import AddTeamModal from "../../components/modals/AddTeamModal";
import EditTeamModal from "../../components/modals/EditTeamModal";

export default function TeamPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const teamRef = collection(db, "team");
    const q = query(teamRef, orderBy("createdAt", "desc"));

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
        console.error("Error fetching team members:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (memberId: string) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "team", memberId));
    } catch (error) {
      console.error("Failed to delete team member:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Our Team</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Member
        </button>
      </div>

      {showModal && (
        <AddTeamModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingMember && (
        <EditTeamModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSuccess={() => setEditingMember(null)}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TeamList
          items={loadedItems}
          onEdit={(member) => setEditingMember(member)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}