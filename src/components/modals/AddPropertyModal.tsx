import { useState, type ChangeEvent, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import InputField from "../InputField";

interface AddPropertyModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function AddPropertyModal({
  onClose,
  onSuccess,
}: AddPropertyModalProps) {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureField = () => {
    setFeatures([...features, ""]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        typeof value === "string" &&
        !isNaN(Number(value)) &&
        value.trim() !== ""
          ? Number(value)
          : value,
    }));
  };
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "properties");

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const urls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      setImageUrls(urls);
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

    if (imageUrls.length === 0) {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        imageUrls,
        features: features.filter((f) => f.trim() !== ""),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "properties"), payload);

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Error adding property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
      >
        <h2 className="text-2xl text-[#333] font-bold mb-4">Add Property</h2>
        <div className="flex justify-between gap-8">
          <div className="flex flex-col w-1/2 gap-2">
            <h3 className="text-xl text-[#333] font-bold">Basic info</h3>
            <div className="flex items-center justify-between gap-2">
              <InputField  placeholder="Type" name="type" onChange={handleInputChange}/>
              <InputField placeholder="Name" name="name" onChange={handleInputChange} />
              <InputField name="location"   placeholder="Location"  onChange={handleInputChange} />
              <InputField name="price" type="number" placeholder="Price" onChange={handleInputChange} />
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <h3 className="text-xl text-[#333] font-bold">Static info</h3>
            <div className="flex items-center justify-between gap-2">
              <InputField name="bedrooms" type="number" placeholder="Bedrooms" onChange={handleInputChange}/>
              <InputField name="bathrooms" type="number" placeholder="Bathrooms" onChange={handleInputChange}/>
              <InputField name="area" type="number" placeholder="Area (m²)" onChange={handleInputChange}/>
              <InputField name="build_year" type="number" min={1000} max={9999} placeholder="Build year" onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <h3 className="text-xl text-[#333] font-bold">
          Description & Features
        </h3>
        <div className="flex justify-between gap-2">
          <textarea
            name="description"
            placeholder="Property description"
            onChange={handleChange}
            className="w-1/2 border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
            required
          />
          <div className="flex w-1/2 gap-2">
            <div className="flex flex-col w-full gap-2">
              {features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full border-2 border-gray-400 text-[#333] placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                  required
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addFeatureField}
              className="bg-[#703BF7] text-xl font-bold aspect-square w-11 h-11 flex items-center justify-center text-white p-1 rounded cursor-pointer hover:bg-[#5e2bd6]"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-[#333] font-bold">Additional Fees</h3>
            <div className="flex items-center flex-wrap gap-1.5">
              <InputField name="transfer_tax" type="number" placeholder="Transfer Tax" onChange={handleInputChange} className=""/>
              <InputField name="legal_fees" type="number" placeholder="Legal Fees" onChange={handleInputChange} className=""/>
              <InputField name="inspection" type="number" placeholder="Home Inspection" onChange={handleInputChange} className=""/>
              <InputField name="insurance"type="number" placeholder="Property Insurance"onChange={handleInputChange}className=""/>
              <InputField name="mortgage_fees"placeholder="Mortgage Fees"onChange={handleInputChange}className="" />
              <InputField name="monthly_taxes" type="number" placeholder=" Property Taxes" onChange={handleInputChange} className=""  />
              <InputField name="hoa_fee" type="number" placeholder="Homeowners' Association Fee" onChange={handleInputChange} className=""  />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-[#333] font-bold">Total Initial Costs</h3>
            <div className="flex items-center flex-wrap gap-1.5">
              <InputField name="listing_price" type="number" placeholder="Listing Price" onChange={handleInputChange} className=""/>
              <InputField name="total_additional_fees" type="number" placeholder="Add Fees Total" onChange={handleInputChange} className=" "/>
              <InputField name="down_payment" type="number" placeholder="Down Payment" onChange={handleInputChange} className=""/>
              <InputField name="mortgage_amount" type="number" placeholder="Mortgage Amount" onChange={handleInputChange} className=""/>
              <InputField name="expense_taxes" type="number" placeholder="Expense Taxes" onChange={handleInputChange} className=""/>
              <InputField name="expense_insurance" type="number" placeholder="Expense Insurance" onChange={handleInputChange} className="" required/>
              <InputField name="expense_mortgage" type="text" placeholder="Expense Mortgage" onChange={handleInputChange} className="" required/>
            </div>
          </div>
        </div>
        <h3 className="text-xl text-[#333] font-bold">Upload Images</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-fit flex items-center justify-center">
            <input
              className="border-2 text-transparent p-1 rounded bg-[#703BF7] hover:bg-[#5e2bd6] aspect-square w-11 h-11 cursor-pointer"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              multiple
              onChange={handleImageUpload}
            />
            <label className="absolute text-xl font-bold flex items-center justify-center text-white">
              +
            </label>
          </div>
          {uploading && <p className="text-[#333]">Uploading images...</p>}

          <div className="flex gap-2 flex-wrap mt-2">
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#703BF7] hover:bg-[#5e2bd6] cursor-pointer text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
