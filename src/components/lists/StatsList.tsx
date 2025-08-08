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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((stat) => (
        <div
          key={stat.id}
          className="bg-darkGray rounded-2xl overflow-hidden shadow-lg border border-borderColor
                   transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:shadow-mainPurple cursor-pointer"
        >
          <div className="p-6">
            {/* Header with icon */}
            <div className="flex items-center gap-4 mb-4">
              {stat.icon && (
                <div className="bg-mainPurple text-white p-3 rounded-full">
                  <i className={`${stat.icon} text-xl`}></i>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-mainText">{stat.title}</h2>
                <p className="text-3xl font-bold animated-gradient-text mt-1">{stat.value}</p>
              </div>
            </div>

            {/* Description */}
            {stat.description && (
              <p className="text-secText line-clamp-2 mb-4">
                {stat.description}
              </p>
            )}

           
            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-borderColor">
              <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                <Link 
                  to={`/stat/${stat.id}`} 
                  className="text-sm font-medium animated-gradient-text hover:text-secPurple flex items-center"
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-mainPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(stat)}
                  className="text-secPurple hover:text-mainPurple text-sm font-medium
                             transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(stat.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium
                             transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}