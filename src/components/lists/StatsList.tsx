import Card from "../../reusecomponents/Cards";

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
           <Card
             key={stat.id}
             id={stat.id}
             title={stat.title}
             description={stat.description}
             imageUrls={stat.imageUrls}
             imagePosition="background"
             imageSize="full"
             metadata={{
               features: stat.features,
               value: stat.year,
             }}
             viewLink={`/stat/${stat.id}`}
             onEdit={() => onEdit(stat)}
             onDelete={() => onDelete(stat.id)}
             cardStyle="elevated"
             hoverEffect={true}
             className="h-full"
           />
         ))}
       </div>
  );
}