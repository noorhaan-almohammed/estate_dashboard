import Card from "../../reusecomponents/Cards";

interface OfficeLocation {
  id: string;
  title: string;
  locationDetails: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  createdAt?: any;
}

interface OfficeLocationsListProps {
  items: OfficeLocation[];
  onEdit: (location: OfficeLocation) => void;
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
          subtitle={location.locationDetails}
          description={location.description}
          imagePosition="top"
          imageSize="medium"
          imageShape="rounded"
          metadata={{
            icon: "fas fa-building",
            contact: {
              phone: location.contactPhone,
              phoneIcon: "fas fa-phone",
              email: location.contactEmail,
              emailIcon: "fas fa-envelope",
            },
           
            date: location.createdAt?.toDate 
              ? location.createdAt.toDate().toISOString()
              : new Date().toISOString(),
            features: [
              {
                text: `${location.contactLocation}`,
                icon: "fas fa-map-pin"
              }
            ]
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