import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function OfficeLocationPage() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const docRef = doc(db, "officeLocations", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLocation({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  const handleGetDirections = () => {
    if (location?.contactLocation) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.contactLocation)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!location)
    return <p className="text-center text-red-600 mt-8">Location not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/office-locations-dashboard"
          className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Back to list
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{location.title}</h1>
        <p className="text-gray-600 mb-2">{location.locationDetails}</p>
        
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{location.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="mb-1"><strong>Phone:</strong> {location.contactPhone}</p>
            <p className="mb-1"><strong>Email:</strong> {location.contactEmail}</p>
            <p><strong>Address:</strong> {location.contactLocation}</p>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGetDirections}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}