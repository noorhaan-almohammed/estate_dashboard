import Card from "../../reusecomponents/Cards";

export default function ClientsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (client: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((client) => (
        <Card
          key={client.id}
          id={client.id}
          title={client.title}
          description={client.what_say}
          metadata={{
            label: `Category: ${client.category}`,
            categoryIcon: "fa fa-bolt-lightning",
            value: `Domain: ${client.domain}`,
            domainIcon: "fa fa-qrcode",
            date: client.date?.toDate 
              ? client.date.toDate().toISOString() 
              : client.date instanceof Date 
                ? client.date.toISOString()
                : "",
            dateIcon: "fas fa-calendar-alt",
           
          }}
          viewLink={`/client/${client.id}`}
          onEdit={() => onEdit(client)}
          onDelete={() => onDelete(client.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}