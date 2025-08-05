import { useState, type ChangeEvent, type FormEvent } from "react";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
export interface Property {
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
  tag_description:string;
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
  updatedAt?: Timestamp;
  createdAt: Timestamp;  
}

interface EditPropertyModalProps {
  onClose: () => void;
  onSuccess: () => void;
  property: Property;
}

export default function EditPropertyModal({
  onClose,
  onSuccess,
  property,
}: EditPropertyModalProps) {
  const [formData, setFormData] = useState({
    name: property.name || "",
    type: property.type || "",
    location: property.location || "",
    price: property.price || "",
    tag_description:property.tag_description || "",
    description: property.description || "",
    feature_description: property.feature_description || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    area: property.area || "",
    build_year: property.build_year || "",
    down_payment: property.down_payment || "",
    mortgage_amount: property.mortgage_amount || "",
    mortgage_fees: property.mortgage_fees || "",
    monthly_taxes: property.monthly_taxes || "",
    expense_taxes: property.expense_taxes || "",
    expense_insurance: property.expense_insurance || "",
    legal_fees: property.legal_fees || "",
    transfer_tax: property.transfer_tax || "",
    inspection: property.inspection || "",
    insurance: property.insurance || "",
    hoa_fee: property.hoa_fee || "",
    total_additional_fees: property.total_additional_fees || "",
    listing_price: property.listing_price,
    expense_mortgage: property.expense_mortgage
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    property.imageUrls || []
  );
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>(property.features || []);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureField = () => {
    setFeatures((prev) => [...prev, ""]);
  };
  const removeFeatureField = (index: number) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const urls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_upload");
        formData.append("folder", "properties");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload",
          { method: "POST", body: formData }
        );

        const data = await res.json();
        if (res.ok && data.secure_url) {
          urls.push(data.secure_url);
        } else {
          throw new Error(data.error?.message || "Upload failed");
        }
      }
      setImageUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyRef = doc(db, "properties", property.id);
      await updateDoc(propertyRef, {
        ...formData,
        features,
        imageUrls,
        updatedAt: new Date(),
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating property:", err);
      alert("Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };
  return (
    <div className=" fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
      >
      <h2 className="text-2xl text-[#333] font-bold mb-4">Edit Property</h2>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-[#333] font-bold">Basic info</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "name", type: "text", placeholder: "Property Name" },
                { name: "type", type: "text", placeholder: "Property Type" },
                { name: "location", type: "text", placeholder: "Location" },
                { name: "price", type: "number", placeholder: "Price" },
              ].map((field) => (
                <div className="flex flex-col gap-1">
                  <label>{field.placeholder}</label>
                  <input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-35 lg:w-full border-2 p-2 rounded border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-[#333] font-bold">Static info</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "bedrooms", type: "number", placeholder: "Bedrooms" },
                { name: "bathrooms", type: "number", placeholder: "Bathrooms" },
                { name: "area", type: "number", placeholder: "Area (m²)" },
                {
                  name: "build_year",
                  type: "number",
                  placeholder: "Build Year",
                },
              ].map((field) => (
                <div className="flex flex-col gap-1">
                  <label>{field.placeholder}</label>
                  <input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-35 lg:w-full border-2 p-2 rounded border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-xl text-[#333] font-bold">
          Description & Features
        </h3>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col w-1/2 gap-2">
            <input
              name="tag_description"
              type="text"
              value={property.tag_description}
              onChange={handleChange}
              placeholder="Tag Description"
              className="w-full border-2 p-2 rounded border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm"
              required
            />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className=" border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
          />
          <textarea
            name="feature_description"
            value={formData.feature_description}
            onChange={handleChange}
            placeholder="Feature Description"
            className=" border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
          />
          </div>
          <div className="flex w-1/2 gap-2">
            <div className="flex flex-col w-full gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="bg-red-500 text-white font-bold px-3 rounded hover:bg-red-600"
                    title="Remove Feature"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeatureField}
              className="bg-mainPurple text-xl font-bold aspect-square w-11 h-11 flex items-center justify-center text-white p-1 rounded cursor-pointer hover:bg-hoverPurple"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-[#333] font-bold">Additional Fees</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {name: "transfer_tax", type: "number",   placeholder: "Transfer Tax", },
                {name: "legal_fees", type: "number",   placeholder: "Legal Fees", },
                {name: "inspection", type: "number", placeholder: "Home Inspection",},
                {name: "insurance", type: "number", placeholder: "Property Insurance" },
                {name: "mortgage_fees", type: "number", placeholder: "Mortgage Fees",},
                { name: "expense_taxes", type: "number", placeholder: "Expense Taxes",},
                { name: "expense_insurance", type: "number", placeholder: "Expense Insurance",},
              ].map((field) => (
                <div className="flex flex-col gap-1">
                  <label>{field.placeholder}</label>
                  <input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-35 border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <h3 className="text-xl text-[#333] font-bold">
              Total Initial Costs
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                {name: "down_payment", type: "number",placeholder: "Down Payment",},
                {name: "mortgage_amount",type: "number",placeholder: "Mortgage Amount",},
                {name: "monthly_taxes", type: "number", placeholder: "Monthly Taxes",},
                {name: "hoa_fee", type: "number", placeholder: "HOA Fee" },
                {name: "total_additional_fees", type: "number",placeholder: "Total Additional Fees",},
                {name: "listing_price", type: "number",   placeholder: "Listing Price", },
                {name: "expense_mortgage", type: "text", placeholder: "Expense Mortgage",},
              ].map((field) => (
                <div className="flex flex-col gap-1">
                  <label>{field.placeholder}</label>
                  <input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-35 border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-xl text-[#333] font-bold">Update Images</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-fit flex items-center justify-center">
            <input
              className="border-2 text-transparent p-1 rounded bg-mainPurple hover:bg-hoverPurple aspect-square w-11 h-11 cursor-pointer"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              multiple
              onChange={handleImageUpload}
            />
            <label className="absolute text-xl font-bold flex items-center justify-center text-white">
              +
            </label>
          </div>
          {uploading && (
            <p className="text-sm text-gray-600">Uploading images...</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`image-${idx}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-full flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-mainPurple hover:bg-hoverPurple text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
