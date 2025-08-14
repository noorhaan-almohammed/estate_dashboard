import FormEdit from "../../reusecomponents/FormEdit";


interface OfficeLocation {
  id: string;
  title: string;
  locationDetails: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  createdAt?: any;
}

interface EditOfficeLocationModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: OfficeLocation;
}

export default function EditOfficeLocationModal({
  onClose,
  onSuccess,
  item: location,
}: EditOfficeLocationModalProps) {
  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
      required: true
    },
    {
      name: "locationDetails",
      type: "text",
      placeholder: "Location Details",
      required: true
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Description",
      required: true,
      rows: 3
    },
    {
      name: "contactPhone",
      type: "text",
      placeholder: "Phone",
      required: true
    },
    {
      name: "contactEmail",
      type: "email",
      placeholder: "Email",
      required: true
    },
    {
      name: "contactLocation",
      type: "text",
      placeholder: "Address",
      required: true
    }
  ];

  return (
    <FormEdit
      collectionName="officeLocations"
      item={location}
      fields={fields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}