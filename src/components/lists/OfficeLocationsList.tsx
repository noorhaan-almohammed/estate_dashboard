import Card from "../../reusecomponents/Cards";

interface OfficeLocationsListProps {
  items: any[];
  onEdit: (location: any) => void;
  onDelete: (id: string) => void;
}

export default function OfficeLocationsList({
  items,
  onEdit,
  onDelete,
}: OfficeLocationsListProps) {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
          {items.map((location) => (
            <Card
              key={location.id}
              id={location.id}
              title={location.title}
              description={location.description}
              imageUrls={location.imageUrls}
              imagePosition="background"
              imageSize="full"
              metadata={{
                features: location.features,
                value: location.year,
              }}
              viewLink={`/office-location/${location.id}`}
              onEdit={() => onEdit(location)}
              onDelete={() => onDelete(location.id)}
              cardStyle="elevated"
              hoverEffect={true}
              className="h-full"
            />
          ))}
        </div>
  );
}