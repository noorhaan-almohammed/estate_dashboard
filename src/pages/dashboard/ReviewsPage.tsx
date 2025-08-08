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
import ReviewsList from "../../components/lists/ReviewsList";
import AddReviewModal from "../../components/modals/AddReviewModal";
import EditReviewModal from "../../components/modals/EditReviewModal";

export default function ReviewsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("createdAt", "desc"));

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
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Reviews</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Review
        </button>
      </div>

      {showModal && (
        <AddReviewModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={() => setEditingReview(null)}
        />
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ReviewsList
          items={loadedItems}
          onEdit={(review) => setEditingReview(review)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}