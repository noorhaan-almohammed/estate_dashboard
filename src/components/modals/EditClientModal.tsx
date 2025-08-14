import FormEdit from "../../reusecomponents/FormEdit";


interface Client {
  id: string;
  title: string;
  date: Date | any;
  domain: string;
  category: string;
  what_say: string;
  createdAt: any;
}

interface EditClientModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: Client;
}

export default function EditClientModal({
  onClose,
  onSuccess,
  item: client,
}: EditClientModalProps) {
  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
      required: true
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      required: true
    },
    {
      name: "domain",
      type: "text",
      placeholder: "Domain",
      required: true
    },
    {
      name: "category",
      type: "text",
      placeholder: "Category",
      required: true
    },
    {
      name: "what_say",
      type: "textarea",
      placeholder: "What They Say",
      required: true,
      rows: 4
    }
  ];



  return (
    <FormEdit
      collectionName="clients"
      item={client}
      fields={fields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}