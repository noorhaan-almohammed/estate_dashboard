import Card from "../../reusecomponents/Cards";

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
    
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
         {items.map((review) => (
           <Card
             key={review.id}
             id={review.id}
             title={review.title}
             description={review.description}
             imageUrls={review.imageUrls}
             imagePosition="background"
             imageSize="full"
             metadata={{
               features: review.features,
               value: review.year,
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
