import { motion } from "framer-motion";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Form, { FeaturesInput, FormSection, ImageUpload, InputField } from "./FormAdd";

interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  options?: { value: any; label: string }[];
  rows?: number;
}

interface FormEditProps {
  collectionName: string;
  item: any;
  fields: FormField[];
  onClose: () => void;
  onSuccess: () => void;
  imageFields?: {
    name: string;
    uploadPreset: string;
    folder: string;
    multiple?: boolean;
  }[];
  arrayFields?: {
    name: string;
    placeholder: string;
  }[];
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";

export default function FormEdit({
  collectionName,
  item,
  fields,
  onClose,
  onSuccess,
  imageFields = [],
  arrayFields = [],
}: FormEditProps) {

  const initialFormData = fields.reduce((acc, field) => {
    acc[field.name] = item[field.name] || "";
    return acc;
  }, {} as Record<string, any>);

   const initialImageData = imageFields.reduce((acc, field) => {
    acc[field.name] = item[field.name] || (field.multiple ? [] : "");
    return acc;
  }, {} as Record<string, any>);

   const initialArrayData = arrayFields.reduce((acc, field) => {
    acc[field.name] = item[field.name] || [];
    return acc;
  }, {} as Record<string, any>);

  const [formData, setFormData] = useState(initialFormData);
  const [imageData, setImageData] = useState(initialImageData);
  const [arrayData, setArrayData] = useState(initialArrayData);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     const newFormData = fields.reduce((acc, field) => {
      acc[field.name] = item[field.name] || "";
      return acc;
    }, {} as Record<string, any>);

    const newImageData = imageFields.reduce((acc, field) => {
      acc[field.name] = item[field.name] || (field.multiple ? [] : "");
      return acc;
    }, {} as Record<string, any>);

    const newArrayData = arrayFields.reduce((acc, field) => {
      acc[field.name] = item[field.name] || [];
      return acc;
    }, {} as Record<string, any>);

    setFormData(newFormData);
    setImageData(newImageData);
    setArrayData(newArrayData);
  }, [item]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const fieldConfig = imageFields.find(f => f.name === fieldName);
    if (!fieldConfig) return;

    try {
      if (fieldConfig.multiple) {
        const urls: string[] = [];
        for (const file of Array.from(files)) {
          const url = await uploadToCloudinary(file, fieldConfig.uploadPreset, fieldConfig.folder);
          urls.push(url);
        }
        setImageData(prev => ({
          ...prev,
          [fieldName]: [...prev[fieldName], ...urls]
        }));
      } else {
        const file = files[0];
        if (!file) return;
        const url = await uploadToCloudinary(file, fieldConfig.uploadPreset, fieldConfig.folder);
        setImageData(prev => ({
          ...prev,
          [fieldName]: url
        }));
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const uploadToCloudinary = async (file: File, uploadPreset: string, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

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

  const removeImage = (fieldName: string, urlToRemove: string) => {
    setImageData(prev => ({
      ...prev,
      [fieldName]: Array.isArray(prev[fieldName])
        ? prev[fieldName].filter((url: string) => url !== urlToRemove)
        : ""
    }));
  };

  const handleArrayChange = (fieldName: string, index: number, value: string) => {
    const updated = [...arrayData[fieldName]];
    updated[index] = value;
    setArrayData(prev => ({
      ...prev,
      [fieldName]: updated
    }));
  };

  const addArrayField = (fieldName: string) => {
    setArrayData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""]
    }));
  };

  const removeArrayField = (fieldName: string, index: number) => {
    const updated = [...arrayData[fieldName]];
    updated.splice(index, 1);
    setArrayData(prev => ({
      ...prev,
      [fieldName]: updated
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, collectionName, item.id);
      const updateData: any = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      imageFields.forEach(field => {
        updateData[field.name] = imageData[field.name];
      });


      arrayFields.forEach(field => {
        updateData[field.name] = arrayData[field.name].filter((item: string) => item.trim() !== "");
      });

      await updateDoc(docRef, updateData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(`Error updating ${collectionName}:`, err);
      alert(`Failed to update ${collectionName}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-overlay flex justify-center items-center z-50 backdrop-blur-sm"

      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }}
    >

      <Form
        title={`Edit ${collectionName}`}
        onSubmit={handleSubmit}
        onClose={onClose}
        loading={loading || uploading}
        submitText={loading ? "Updating..." : `Update ${collectionName}`}
      >
        <div className="flex flex-col gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "textarea" ? (
                  <InputField
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={field.rows || 4}
                    required={field.required}
                  />
                ) : field.type === "select" && field.options ? (
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-mainText">
                      {field.placeholder}
                    </label>
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-grayMedium border border-borderColor text-mainText rounded-lg px-4 py-3 focus:ring-2 focus:ring-mainPurple focus:border-transparent"
                      required={field.required}
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <InputField
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>


          {imageFields.map((field) => (
            <FormSection key={field.name} title={field.uploadPreset}>
              <ImageUpload
                onImageUpload={(e) => handleImageUpload(e, field.name)}
                imageUrls={Array.isArray(imageData[field.name])
                  ? imageData[field.name]
                  : imageData[field.name] ? [imageData[field.name]] : []}
                uploading={uploading}
                onRemoveImage={(index) => {
                  const urlToRemove = Array.isArray(imageData[field.name])
                    ? imageData[field.name][index]
                    : imageData[field.name];
                  removeImage(field.name, urlToRemove);
                }}
                multiple={field.multiple}
              />
            </FormSection>
          ))}


          {arrayFields.map((field) => (
            <FormSection key={field.name} title={field.placeholder}>
              <FeaturesInput
                features={arrayData[field.name]}
                onFeatureChange={(index, value) => handleArrayChange(field.name, index, value)}
                onAddFeature={() => addArrayField(field.name)}
                onRemoveFeature={(index) => removeArrayField(field.name, index)}
              />
            </FormSection>
          ))}
        </div>
      </Form>
    </motion.div>
  );
}