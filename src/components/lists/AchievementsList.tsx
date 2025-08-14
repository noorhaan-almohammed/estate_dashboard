import Card from "../../reusecomponents/Cards";

export default function AchievementsList({
  items,
  onEdit,
  onDelete,
}: {
  items: any[];
  onEdit: (achievement: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((achievement) => (
        <Card
          key={achievement.id}
          id={achievement.id}
          title={achievement.title}
          description={achievement.description}
          imageUrls={achievement.imageUrls}
          imagePosition="background"
          imageSize="full"
          metadata={{
            features: achievement.features,
            value: achievement.year,
          }}
          viewLink={`/achieve/${achievement.id}`}
          onEdit={() => onEdit(achievement)}
          onDelete={() => onDelete(achievement.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}