import Card from "../../reusecomponents/Cards";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt?: any;
}

interface FAQListProps {
  items: FAQ[];
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
}

export default function FAQList({ items, onEdit, onDelete }: FAQListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 bg-bg">
      {items.map((faq) => (
        <Card
          key={faq.id}
          id={faq.id}
          title={faq.question}
          description={faq.answer}
         
          metadata={{
            icon: "fas fa-question-circle", 
            date: faq.createdAt?.toDate 
              ? faq.createdAt.toDate().toISOString() 
              : new Date().toISOString(),
            features: [
              {
                text: "FAQ",
                icon: "fas fa-info-circle"
              }
            ]
          }}
          onEdit={() => onEdit(faq)}
          onDelete={() => onDelete(faq.id)}
          cardStyle="elevated"
          hoverEffect={true}
          className="h-full"
        />
      ))}
    </div>
  );
}