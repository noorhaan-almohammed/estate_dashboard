import FormEdit from "../../reusecomponents/FormEdit";


interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface EditFaqModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: FAQ;
}

export default function EditFaqModal({
  item: faq,
  onClose,
  onSuccess,
}: EditFaqModalProps) {
  const fields = [
    {
      name: "question",
      type: "text",
      placeholder: "Question",
      required: true
    },
    {
      name: "answer",
      type: "textarea",
      placeholder: "Answer",
      required: true,
      rows: 5
    }
  ];

  return (
    <FormEdit
      collectionName="faqs"
      item={faq}
      fields={fields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}