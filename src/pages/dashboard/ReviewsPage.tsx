import { useState } from "react";
import AddReviewModal from "../../components/modals/AddReviewModal";
import ReviewsList from "../../components/lists/ReviewsList";
import testPhoto from "../../assets/cleint test.png";
import EditReviewModal from "../../components/modals/EditReviewModal";

export interface ReviewListData {
  id: number;
  rating: number;
  name: string;
  country: string;
  city: string;
  title: string;
  description: string;
  profile: string;
}

const reviewListData: ReviewListData[] = [
  {
    id: 1,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
  {
    id: 2,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
  {
    id: 3,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
  {
    id: 4,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
  {
    id: 5,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
  {
    id: 6,
    rating: 3,
    name: "younis issa",
    country: "Syria",
    city: "tartous",
    title: "Mamma Mia Marcelo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi maxime officia, quisquam reprehenderit nostrum laboriosam id, quo culpa vel sit libero ratione temporibus quod facere repudiandae doloribus est voluptatum? Fugit.",
    profile: testPhoto,
  },
];

function ReviewsPage() {
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Reviews</h2>
        <button
          onClick={() => setAddReviewModal(true)}
          className="bg-mainPurple text-white px-4 py-2 rounded-lg hover:bg-hoverPurple"
        >
          + Add Review
        </button>
      </div>

      {addReviewModal && (
        <AddReviewModal
          onClose={() => {setAddReviewModal(false); setShowEditModal(false)}}
        />
      )}

      {showEditModal && (
        <EditReviewModal
          onClose={() => setShowEditModal(false)}
        />
      )}

      <ReviewsList
        items={reviewListData}
        setShowEditModal={setShowEditModal}
      />
    </div>
  );
}

export default ReviewsPage;
