import { Link } from "react-router-dom";

export default function ReviewsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (review: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((review) => (
        <div key={review.id} className="border rounded-xl p-4 shadow">
          <div className="flex items-center gap-3 mb-3">
            {review.profileimage && (
              <img 
                src={review.profileimage} 
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-600">
                {review.city}, {review.country}
              </p>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">
                {i < review.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
          
          <h4 className="font-medium">{review.title}</h4>
          <p className="text-sm text-gray-700 line-clamp-2 mt-1">
            {review.description}
          </p>
          
          <div className="mt-4 flex gap-2">
            <Link to={`/review/${review.id}`} className="text-blue-600 cursor-pointer">
              Show
            </Link>

            <button 
              className="text-green-600 cursor-pointer" 
              onClick={() => onEdit(review)}
            >
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
              onClick={() => onDelete(review.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}