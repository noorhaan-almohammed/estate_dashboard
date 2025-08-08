import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function MemberTeamPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const docRef = doc(db, "team", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMember({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching team member:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!member)
    return <p className="text-center text-red-600 mt-8">Team member not found.</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link
          to="/team-dashboard"
          className="font-semibold..."
        >
          Back to list
        </Link>
      </div>

      <div className="flex flex-col items-center">
        {member.profileImage && (
          <img
            src={member.profileImage}
            alt={member.name}
            className="w-48 h-48 rounded-full object-cover mb-6"
          />
        )}

        <h1 className="text-3xl font-bold text-center">{member.name}</h1>
        <p className="text-xl text-gray-600 text-center mb-6">{member.position}</p>

        <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p>
                {member.createdAt?.seconds
                  ? new Date(member.createdAt.seconds * 1000).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}