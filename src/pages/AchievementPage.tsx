import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ImageSlider from "../components/ImageSlider";
import InfoItem from "../components/InfoItem";

export default function AchievementPage() {
  const { id } = useParams<{ id: string }>();
  const [achievement, setAchievement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const docRef = doc(db, "achievements", id!);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAchievement({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching achievement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!achievement)
    return <p className="text-center text-red-600 mt-8">Achievement not found.</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/achievements-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple"
        >
          Back to list
        </Link>
      </div>

      <div>
        {achievement.imageUrls?.length > 0 && (
          <ImageSlider images={achievement.imageUrls} />
        )}

        <h1 className="text-3xl font-bold">{achievement.title}</h1>
        <p className="text-gray-600">{achievement.year}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="Title" value={achievement.title} />
        <InfoItem label="Year" value={achievement.year} />
        <InfoItem
          label="Created At"
          value={
            achievement.createdAt?.seconds
              ? new Date(achievement.createdAt.seconds * 1000).toLocaleString()
              : "-"
          }
        />
        {achievement.updatedAt && (
          <InfoItem
            label="Updated At"
            value={
              achievement.updatedAt?.seconds
                ? new Date(achievement.updatedAt.seconds * 1000).toLocaleString()
                : "-"
            }
          />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{achievement.description}</p>
      </div>

      {achievement.features?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            {achievement.features.map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}