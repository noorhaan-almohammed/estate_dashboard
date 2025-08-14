import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onClose: () => void;
  children: ReactNode;
  loading: boolean;
  submitText?: string;
}

export default function Form({
  title,
  onSubmit,
  onClose,
  children,
  loading,
  submitText = "Submit",
}: FormProps) {
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
      <form
        onSubmit={onSubmit}
        className="bg-darkGray border border-borderColor rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-darkGray border-b border-borderColor p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold animated-gradient-text">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secText hover:text-mainText transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {children}
        </div>

        <div className="sticky bottom-0 bg-darkGray border-t border-borderColor p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-borderColor text-mainText hover:bg-grayMedium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-mainPurple text-white hover:bg-hoverPurple transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </motion.div>

  );
}

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, children, className = "" }: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-semibold text-mainText">{title}</h3>
      {children}
    </div>
  );
}

interface InputFieldProps {
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}

export function InputField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className = "",
  rows,
}: InputFieldProps) {
  const commonClasses = "w-full bg-grayMedium border border-borderColor text-mainText rounded-lg px-4 py-3 focus:ring-2 focus:ring-mainPurple focus:border-transparent";

  return rows ? (
    <textarea
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      className={`${commonClasses} ${className}`}
      required={required}
      value={value}
    />
  ) : (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`${commonClasses} ${className}`}
      required={required}
      value={value}
    />
  );
}

interface ImageUploadProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  uploading: boolean;
  onRemoveImage: (index: number) => void;
  multiple?: boolean;
}

export function ImageUpload({
  onImageUpload,
  imageUrls,
  uploading,
  onRemoveImage,
  multiple = true,
}: ImageUploadProps) {
  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-borderColor rounded-lg cursor-pointer hover:bg-grayMedium transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secText mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-secText">
            <span className="font-semibold text-mainPurple">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-secText">PNG, JPG, JPEG, WEBP (Max 5MB)</p>
        </div>
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          multiple={multiple}
          onChange={onImageUpload}
          className="hidden"
          required={imageUrls.length === 0}
        />
      </label>

      {uploading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainPurple"></div>
        </div>
      )}

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(i)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface FeaturesInputProps {
  features: string[];
  onFeatureChange: (index: number, value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

export function FeaturesInput({
  features,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
}: FeaturesInputProps) {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            type="text"
            placeholder={`Feature ${index + 1}`}
            value={feature}
            onChange={(e) => onFeatureChange(index, e.target.value)}
            className="flex-1 bg-grayMedium border border-borderColor text-mainText rounded-lg px-4 py-2 focus:ring-2 focus:ring-mainPurple focus:border-transparent"
          />
          {features.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveFeature(index)}
              className="text-red-400 hover:text-red-300 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddFeature}
        className="text-sm text-mainPurple hover:text-secPurple flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Feature
      </button>
    </div>
  );
}