import FormEdit from "../../reusecomponents/FormEdit";


interface Stat {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  createdAt: any;
  updatedAt?: any;
}

interface EditStatModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: Stat;
}

export default function EditStatModal({ 
  onClose, 
  onSuccess, 
  item: stat 
}: EditStatModalProps) {
  const fields = [
    { name: "title", type: "text", placeholder: "Title", required: true },
    { name: "value", type: "text", placeholder: "Value", required: true },
    { name: "description", type: "textarea", placeholder: "Description", rows: 3 },
    { name: "icon", type: "text", placeholder: "Icon (FontAwesome class)" }
  ];

  return (
    <FormEdit
      collectionName="stats"
      item={stat}
      fields={fields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}