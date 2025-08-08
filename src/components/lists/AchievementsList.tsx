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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((achievement) => (
        <div
          key={achievement.id}
          className="bg-darkGray rounded-2xl overflow-hidden shadow-lg border border-borderColor
                   transition-all duration-300  hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(112,_59,_247,_0.3)] cursor-pointer"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={achievement.imageUrls?.[0] || '/placeholder-achievement.jpg'}
              alt={achievement.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-2xl font-bold text-mainText">{achievement.title}</h2>
              <div className="w-8 h-8 flex items-center justify-center bg-darkGray rounded-[50%] mt-2">

              <p className="text-xl animated-gradient-text font-bold">{achievement.year}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {achievement.tag_description && (
              <p className="text-sm text-mainPurple font-medium mb-2">
                {achievement.tag_description}
              </p>
            )}
            
            {achievement.description && (
              <p className="text-secText line-clamp-2 mb-4">
                {achievement.description}
              </p>
            )}

            {achievement.features?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {achievement.features.slice(0, 3).map((feature: string, idx: number) => (
                  <span 
                    key={idx}
                    className="inline-block bg-grayMedium text-mainText text-xs px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {achievement.features.length > 3 && (
                  <span className="inline-block bg-grayMedium text-mainText text-xs px-2 py-1 rounded-full">
                    +{achievement.features.length - 3} more
                  </span>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-borderColor">
              <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
                <Link 
                  to={`/achieve/${achievement.id}`} 
                  className="text-sm font-medium  animated-gradient-text hover:text-secPurple flex items-center"
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-mainPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(achievement)}
                  className="text-secPurple hover:text-mainPurple text-sm font-medium
                             transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(achievement.id)}
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