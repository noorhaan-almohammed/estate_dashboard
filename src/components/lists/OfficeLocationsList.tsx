import { Link } from "react-router-dom";

interface OfficeLocationsListProps {
  items: any[];
  onEdit: (location: any) => void; 
  onDelete: (id: string) => void;
}

export default function OfficeLocationsList({
  items,
  onEdit,
  onDelete,
}: OfficeLocationsListProps) { 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((location) => (
        <div key={location.id} className="border rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold">{location.title}</h3>
          <p className="text-sm text-gray-600">{location.locationDetails}</p>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm"><strong>Phone:</strong> {location.contactPhone}</p>
            <p className="text-sm"><strong>Email:</strong> {location.contactEmail}</p>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Link 
              to={`/office-locations/${location.id}`} 
              className="text-blue-600 cursor-pointer"
            >
              View
            </Link>
            <button 
              className="text-green-600 cursor-pointer" 
              onClick={() => onEdit(location)} // استخدام الدالة هنا
            >
              Edit
            </button>
            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(location.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}