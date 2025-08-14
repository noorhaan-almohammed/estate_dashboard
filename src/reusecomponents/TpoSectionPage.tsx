import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import LoadingSpinner from "./LoadingSpinner";

interface ReusableDataPageProps {
  collectionName: string;
  pageTitle: string;
  addButtonText: string;
  ListComponent: React.ComponentType<any>;
  AddModalComponent: React.ComponentType<any>;
  EditModalComponent: React.ComponentType<any>;
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  emptyStateText?: string;
}

export default function ReusableDataPage({
  collectionName,
  pageTitle,
  addButtonText,
  ListComponent,
  AddModalComponent,
  EditModalComponent,
  orderByField = "createdAt",
  orderDirection = "desc",
  emptyStateText = "No data found",
}: ReusableDataPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(orderByField, orderDirection));

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
        console.error(`Error fetching ${collectionName}:`, error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderByField, orderDirection]);

  const handleDelete = async (itemId: string) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, collectionName, itemId));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  

  return (
    <div className="p-8 min-h-screen bg-bg">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
        <motion.h2
          className="text-4xl font-bold animated-gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          {pageTitle}
        </motion.h2>

        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple transition-colors duration-300 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "backOut",
            delay: 0.4
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)"
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          <motion.span
            className="absolute inset-0 bg-white opacity-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: [null, 300],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              repeat: Infinity
            }}
          />
          {addButtonText}
        </motion.button>
      </div>

      {showModal && (
        <AddModalComponent
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingItem && (
        <EditModalComponent
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => {
            setEditingItem(null);
          }}
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : loadedItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block mb-4">
            <svg className="w-16 h-16 text-secPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-gray-500 text-lg">{emptyStateText}</p>
        </div>
      ) : (
        <ListComponent
          items={loadedItems}
          onEdit={(item: any) => setEditingItem(item)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}