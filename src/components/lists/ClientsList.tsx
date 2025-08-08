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
        <div
          key={client.id}
          className="border rounded-xl p-6 shadow hover:shadow-md transition-shadow bg-bg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-secPurple">
                {client.date}
              </h3>
              <p className="text-2xl font-bold text-mainText">{client.title}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[12px]">
            <p className="text-secText mb-4">{client.domin}</p>
            <p className="text-secText mb-4">{client.category}</p>
          </div>
          <p className="text-mainText mb-4">{client.what_say}</p>

          <div className="flex gap-3">
            <Link
              to={`/client/${client.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              View
            </Link>
            <button
              onClick={() => onEdit(client)}
              className="text-green-600 hover:text-green-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(client.id)}
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
