import { Link } from "react-router-dom";

export default function StatsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (stat: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((stat) => (
        <div key={stat.id} className="border rounded-xl p-6 shadow hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
           {/* {stat.icon && (
              <div className="bg-mainPurple text-white p-3 rounded-full">
                 <FontAwesomeIcon icon={stat.icon} className="text-xl" /> 
              </div>
            )}*/}
            <div>
              <h3 className="text-xl font-bold">{stat.title}</h3>
              <p className="text-2xl font-bold text-mainPurple">{stat.value}</p>
            </div>
          </div>
          
          {stat.description && (
            <p className="text-gray-600 mb-4">{stat.description}</p>
          )}

          <div className="flex gap-3">
            <Link 
              to={`/stat/${stat.id}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              View
            </Link>
            <button 
              onClick={() => onEdit(stat)}
              className="text-green-600 hover:text-green-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(stat.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}