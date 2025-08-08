import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import InfoItem from "../components/InfoItem";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const docRef = doc(db, "reviews", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReview({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching review:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!review)
    return <p className="text-center text-red-600 mt-8">Review not found.</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/reviews-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple"
        >
          Back to list
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {review.profileimage && (
          <img 
            src={review.profileimage} 
            alt={review.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        
        <div>
          <h1 className="text-3xl font-bold">{review.name}</h1>
          <p className="text-gray-600">
            {review.city}, {review.country}
          </p>
          
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl text-yellow-500">
                {i < review.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
          <p className="text-gray-700 whitespace-pre-line">{review.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            label="Created At"
            value={
              review.createdAt?.seconds
                ? new Date(review.createdAt.seconds * 1000).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}