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
import PropertiesList from "../../components/lists/PropertiesList";
import AddPropertyModal from "../../components/modals/AddPropertyModal";
import EditPropertyModal from "../../components/modals/EditPropertyModal";

export default function PropertiesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const propertiesRef = collection(db, "properties");
    const q = query(propertiesRef, orderBy("createdAt", "desc"));

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
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (propertyId: string) => {
    if (!window.confirm(`Sure delete property?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, "properties", propertyId));
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Properties</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Property
        </button>
      </div>

      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)} 
        />
      )}

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSuccess={() => {
            setEditingProperty(null);
          }}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PropertiesList
          items={loadedItems}
          onEdit={(property) => setEditingProperty(property)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
