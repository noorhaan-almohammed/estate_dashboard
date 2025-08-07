import { Link } from "react-router-dom";

export default function AchievementsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (achievement: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((achievement) => (
        <div key={achievement.id} className="border rounded-xl p-4 shadow">
          <img
            src={achievement.imageUrls?.[0]}
            alt={achievement.title}
            className="h-40 w-full object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.year}</p>
          <div className="mt-4 flex gap-2">
            <Link to={`/achieve/${achievement.id}`} className="text-blue-600 cursor-pointer">
              Show
            </Link>

            <button className="text-green-600 cursor-pointer" onClick={() => onEdit(achievement)}>
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(achievement.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}