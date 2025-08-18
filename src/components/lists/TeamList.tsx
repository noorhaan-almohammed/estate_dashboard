import Card from "../../reusecomponents/Cards";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  profileImage?: string;
  description?: string;
  createdAt?: {
    seconds?: number;
    nanoseconds?: number;
  } | Date;
}

interface TeamListProps {
  items: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

export default function TeamList({ items, onEdit, onDelete }: TeamListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((member) => (
        <Card
          key={member.id}
          id={member.id}
          title={member.name}
          subtitle={member.position}
          description={member.description}
          imageUrls={member.profileImage ? [member.profileImage] : []}
          imagePosition="top"
          imageSize="medium"
          imageShape="circle"
          metadata={{
            position: member.position,
            positionIcon: "fas fa-briefcase",
            date: member.createdAt instanceof Date 
              ? member.createdAt.toISOString() 
              : member.createdAt?.seconds 
                ? new Date(member.createdAt.seconds * 1000).toISOString()
                : new Date().toISOString(),
            features: [
              {
                text: "Team Member",
                icon: "fas fa-users"
              }
            ],
            contact: {
              emailIcon: "fas fa-envelope",
              phoneIcon: "fas fa-phone"
            }
          }}
          viewLink={`/team-member/${member.id}`}
          onEdit={() => onEdit(member)}
          onDelete={() => onDelete(member.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}