import FormEdit from "../../reusecomponents/FormEdit";


interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  listing_price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  build_year: string;
  description: string;
  feature_description: string;
  tag_description: string;
  down_payment: number;
  mortgage_amount: number;
  mortgage_fees: number;
  monthly_taxes: number;
  expense_taxes: number;
  expense_mortgage: string;
  expense_insurance: number;
  legal_fees: number;
  transfer_tax: number;
  inspection: number;
  insurance: number;
  hoa_fee: number;
  total_additional_fees: number;
  features: string[];
  imageUrls: string[];
  updatedAt?: any;
  createdAt: any;
}

interface EditPropertyModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: Property;
}

export default function EditPropertyModal({
  onClose,
  onSuccess,
  item: property,
}: EditPropertyModalProps) {
  const fields = [
    { name: "name", type: "text", placeholder: "Property Name", required: true },
    { name: "type", type: "text", placeholder: "Property Type", required: true },
    { name: "location", type: "text", placeholder: "Location", required: true },
    { name: "price", type: "number", placeholder: "Price", required: true },
    { name: "tag_description", type: "text", placeholder: "Tag Description", required: true },
    { name: "description", type: "textarea", placeholder: "Description", rows: 3 },
    { name: "feature_description", type: "textarea", placeholder: "Feature Description", rows: 3 },
    { name: "bedrooms", type: "number", placeholder: "Bedrooms" },
    { name: "bathrooms", type: "number", placeholder: "Bathrooms" },
    { name: "area", type: "number", placeholder: "Area (m²)" },
    { name: "build_year", type: "number", placeholder: "Build Year" },
    { name: "down_payment", type: "number", placeholder: "Down Payment" },
    { name: "mortgage_amount", type: "number", placeholder: "Mortgage Amount" },
    { name: "mortgage_fees", type: "number", placeholder: "Mortgage Fees" },
    { name: "monthly_taxes", type: "number", placeholder: "Monthly Taxes" },
    { name: "expense_taxes", type: "number", placeholder: "Expense Taxes" },
    { name: "expense_insurance", type: "number", placeholder: "Expense Insurance" },
    { name: "legal_fees", type: "number", placeholder: "Legal Fees" },
    { name: "transfer_tax", type: "number", placeholder: "Transfer Tax" },
    { name: "inspection", type: "number", placeholder: "Home Inspection" },
    { name: "insurance", type: "number", placeholder: "Property Insurance" },
    { name: "hoa_fee", type: "number", placeholder: "HOA Fee" },
    { name: "total_additional_fees", type: "number", placeholder: "Total Additional Fees" },
    { name: "listing_price", type: "number", placeholder: "Listing Price" },
    { name: "expense_mortgage", type: "text", placeholder: "Expense Mortgage" }
  ];

  const imageFields = [{
    name: "imageUrls",
    uploadPreset: "unsigned_upload",
    folder: "properties",
    multiple: true
  }];

  const arrayFields = [{
    name: "features",
    placeholder: "Feature"
  }];



  return (
    <FormEdit
      collectionName="properties"
      item={property}
      fields={fields}
      imageFields={imageFields}
      arrayFields={arrayFields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}