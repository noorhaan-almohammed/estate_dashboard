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
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {items.map((member) => (
    //     <div key={member.id} className="border rounded-xl p-4 shadow flex flex-col items-center">
    //       {member.profileImage && (
    //         <img
    //           src={member.profileImage}
    //           alt={member.name}
    //           className="w-32 h-32 rounded-full object-cover mb-4"
    //         />
    //       )}
    //       <h3 className="text-lg font-semibold text-center">{member.name}</h3>
    //       <p className="text-sm text-gray-600 text-center mb-4">{member.position}</p>

    //       <div className="mt-auto flex gap-2">
    //         <Link
    //           to={`/team-member/${member.id}`}
    //           className="text-blue-600 cursor-pointer"
    //         >
    //           Show
    //         </Link>

    //         <button
    //           className="text-green-600 cursor-pointer"
    //           onClick={() => onEdit(member)}
    //         >
    //           Edit
    //         </button>

    //         <button
    //           className="text-red-600 cursor-pointer"
    //           onClick={() => onDelete(member.id)}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((member) => (
        <Card
          key={member.id}
          id={member.id}
          title={member.name}
          description={member.description}
          imagePosition="background"
          imageSize="full"
          metadata={{
      
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