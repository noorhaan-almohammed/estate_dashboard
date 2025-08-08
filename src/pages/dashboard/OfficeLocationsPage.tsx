import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import OfficeLocationsList from "../../components/lists/OfficeLocationsList";
import AddOfficeLocationModal from "../../components/modals/AddOfficeLocationModal";
import EditOfficeLocationModal from "../../components/modals/EditOfficeLocationModal";

export default function OfficeLocationsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);


  useEffect(() => {
    setIsLoading(true);
    const locationsRef = collection(db, "officeLocations");
    const q = query(locationsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: any[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setLocations(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching locations:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (locationId: string) => {
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "officeLocations", locationId));
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Office Locations</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Location
        </button>
      </div>

      {showModal && (
        <AddOfficeLocationModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingLocation && (
        <EditOfficeLocationModal
          location={editingLocation}
          onClose={() => setEditingLocation(null)}
          onSuccess={() => setEditingLocation(null)}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <OfficeLocationsList
          items={locations}
          onEdit={(location) => setEditingLocation(location)} 
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}