import Card from "../../reusecomponents/Cards";

interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  description: string;
  imageUrls: string[];
  createdAt?: any;
  build_year?: number;
}

interface PropertiesListProps {
  items: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export default function PropertiesList({
  items,
  onEdit,
  onDelete,
}: PropertiesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((property) => (
        <Card
          key={property.id}
          id={property.id}
          title={property.name}
          subtitle={property.location}
          description={property.description}
          imageUrls={property.imageUrls}
          imagePosition="background"
          imageSize="full"
          metadata={{
            icon: "fas fa-home",
            label: property.type,
            value: `$${property.price.toLocaleString()}`,
            date: property.createdAt?.toDate 
              ? property.createdAt.toDate().toISOString()
              : property.createdAt instanceof Date
                ? property.createdAt.toISOString()
                : "",
            features: [
              {
                text: `${property.bedrooms} Bed`,
                icon: "fas fa-bed"
              },
              {
                text: `${property.bathrooms} Bath`,
                icon: "fas fa-bath"
              },
              {
                text: `${property.area} m²`,
                icon: "fas fa-ruler-combined"
              },
              {
                text: property.build_year ? `Built ${property.build_year}` : "",
                icon: "fas fa-calendar-alt"
              }
            ],
            contact: {
              phoneIcon: "fas fa-phone",
              emailIcon: "fas fa-envelope"
            }
          }}
          viewLink={`/property/${property.id}`}
          onEdit={() => onEdit(property)}
          onDelete={() => onDelete(property.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full bg-white dark:bg-gray-800"
        />
      ))}
    </div>
  );
}