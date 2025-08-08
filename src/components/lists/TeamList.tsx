import { Link } from "react-router-dom";

export default function TeamList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (member: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((member) => (
        <div key={member.id} className="border rounded-xl p-4 shadow flex flex-col items-center">
          {member.profileImage && (
            <img
              src={member.profileImage}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}
          <h3 className="text-lg font-semibold text-center">{member.name}</h3>
          <p className="text-sm text-gray-600 text-center mb-4">{member.position}</p>

          <div className="mt-auto flex gap-2">
            <Link
              to={`/team-member/${member.id}`}  
              className="text-blue-600 cursor-pointer"
            >
              Show
            </Link>

            <button
              className="text-green-600 cursor-pointer"
              onClick={() => onEdit(member)}
            >
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(member.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}