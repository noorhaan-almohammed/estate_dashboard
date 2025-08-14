import ReviewsList from "../../components/lists/ReviewsList";
import AddReviewModal from "../../components/modals/AddReviewModal";
import EditReviewModal from "../../components/modals/EditReviewModal";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

export default function ReviewsPage() {
  return (
    <ReusableDataPage
      collectionName="reviews"
      pageTitle="All Reviews"
      addButtonText="+ Add Review"
      ListComponent={ReviewsList}
      AddModalComponent={AddReviewModal}
      EditModalComponent={EditReviewModal}
      emptyStateText="No reviews found"
    />
  );
}