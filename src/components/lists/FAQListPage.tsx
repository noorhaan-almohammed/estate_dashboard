import Card from "../../reusecomponents/Cards";

interface FAQ {
  id: string;
  question: string;
  answer: string;
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
              imagePosition="background"
              imageSize="full"
              metadata={{
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