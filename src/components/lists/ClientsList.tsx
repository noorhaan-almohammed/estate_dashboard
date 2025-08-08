import { Link } from "react-router-dom";

export default function ClientsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (client: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((client) => (
        <div key={client.id} className="border rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold">{client.title}</h3>
          <p className="text-sm text-gray-600">{client.domain}</p>
          <p className="text-sm text-gray-600">{client.category}</p>
          <p className="text-sm text-gray-600">
            {new Date(client.date).toLocaleDateString()}
          </p>
          <p className="text-sm mt-2 line-clamp-2">{client.what_say}</p>
          
          <div className="mt-4 flex gap-2">
            <Link to={`/client/${client.id}`} className="text-blue-600 cursor-pointer">
              Show
            </Link>

            <button className="text-green-600 cursor-pointer" onClick={() => onEdit(client)}>
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(client.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}