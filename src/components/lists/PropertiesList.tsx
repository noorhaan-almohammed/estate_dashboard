import { Link } from "react-router-dom";

export default function PropertiesList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (property: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((property) => (
        <div key={property.id} className="border rounded-xl p-4 shadow">
          <img
            src={property.imageUrls?.[0]}
            alt={property.type}
            className="h-40 w-full object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2">{property.type}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
          <div className="mt-4 flex gap-2">
            <Link to={`/property/${property.id}`} className="text-blue-600 cursor-pointer">
              Show
            </Link>

            <button className="text-green-600 cursor-pointer" onClick={() => onEdit(property)}>
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(property.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
