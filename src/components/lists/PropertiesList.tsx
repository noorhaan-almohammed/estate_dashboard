import Card from "../../reusecomponents/Cards";

export default function PropertiesList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (property: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((property) => (
        <Card
          key={property.id}
          id={property.id}
          title={property.name}
          description={property.description}
          imageUrls={property.imageUrls}
          imagePosition="background"
          imageSize="full"
          metadata={{
            label: property.type,
            value: `$${property.price.toLocaleString()}`,
            date: property.createdAt?.toDate 
              ? property.createdAt.toDate().toISOString()
              : property.createdAt instanceof Date
                ? property.createdAt.toISOString()
                : "",
            features: [
              `${property.bedrooms} Bed`,
              `${property.bathrooms} Bath`,
              `${property.area} m²`,
              property.location
            ],
            contact: {
              phone: "", 
            },
          }}
          viewLink={`/property/${property.id}`}
          onEdit={() => onEdit(property)}
          onDelete={() => onDelete(property.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}