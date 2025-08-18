import Card from "../../reusecomponents/Cards";

interface Stat {
  id: string;
  title: string;
  value: string;
  description?: string;
  icon?: string;
  createdAt?: any;
}

interface StatsListProps {
  items: Stat[];
  onEdit: (stat: Stat) => void;
  onDelete: (id: string) => void;
}

export default function StatsList({ items, onEdit, onDelete }: StatsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-bg">
      {items.map((stat) => (
        <Card
          key={stat.id}
          id={stat.id}
          title={stat.title}
          subtitle={stat.value}
          description={stat.description}
          imagePosition="top"
          imageSize="small"
          imageShape="rounded"
          metadata={{
            icon: stat.icon || "fas fa-chart-bar",
            date: stat.createdAt?.toDate 
              ? stat.createdAt.toDate().toISOString()
              : new Date().toISOString(),
            features: [
              {
                text: "Statistic",
                icon: "fas fa-chart-line"
              }
            ]
          }}
          viewLink={`/stat/${stat.id}`}
          onEdit={() => onEdit(stat)}
          onDelete={() => onDelete(stat.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700"
        />
      ))}
    </div>
  );
}