import SharedDetailsPage from "../reusecomponents/SharedDetailsPage";

export default function ReviewPage() {
  return (
    <SharedDetailsPage
      collectionName="reviews"
      backLink="/reviews-dashboard"
      backLinkText="Back to list"
      titleField="name"
      customComponents={{
        rating: (value) => (
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl text-yellow-500">
                {i < value ? '★' : '☆'}
              </span>
            ))}
          </div>
        )
      }}
    />
  );
}