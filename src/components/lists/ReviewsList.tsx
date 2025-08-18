import Card from "../../reusecomponents/Cards";

interface Review {
  id: string;
  name: string;
  country: string;
  city: string;
  title: string;
  description: string;
  rating: number;
  profileimage: string;
  createdAt: any;
}

export default function ReviewsList({
  items,
  onEdit,
  onDelete,
}: {
  items: Review[];
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((review) => (
        <Card
          key={review.id}
          id={review.id}
          subtitle={`${review.name}, ${review.city}, ${review.country}`}
          title={review.title}
          description={review.description}
          imageUrls={review.profileimage ? [review.profileimage] : []}
          imagePosition="top"
          imageSize="medium"
          imageShape="circle"
          metadata={{
            rating: review.rating,
            date: review.createdAt?.toDate
              ? review.createdAt.toDate().toISOString()
              : new Date().toISOString(),
          }}
          viewLink={`/review/${review.id}`}
          onEdit={() => onEdit(review)}
          onDelete={() => onDelete(review.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}