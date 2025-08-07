import { Link } from "react-router-dom";
import type { ReviewListData } from "../../pages/dashboard/ReviewsPage";
import type { Dispatch, SetStateAction } from "react";

const ReviewsList = ({
  items,
  setShowEditModal,
}: {
  items: ReviewListData[];
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((review: ReviewListData) => (
        <div key={review.id} className="border rounded-xl p-4 shadow">
          <p className="text-sm text-gray-600">{`Rating: ${review.rating} out of 5`}</p>
          <h3 className="text-lg font-semibold mt-2">{review.title}</h3>
          <p className="text-sm text-gray-600">{review.description}</p>

          <div className="flex gap-4 mt-2">
            <div className="rounded-full w-15 h-15 overflow-hidden">
              <img
                src={review.profile}
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-600">{`${review.country}, ${review.city}`}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              to={`/review/${review.id}`}
              className="text-blue-600 cursor-pointer"
            >
              Show
            </Link>

            <button
              className="text-green-600 cursor-pointer"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              Edit
            </button>

            <button
              className="text-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
