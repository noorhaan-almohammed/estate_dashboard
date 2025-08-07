import React, { useState, type ChangeEvent,  } from "react";

interface InputFieldProps {
  name: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
  value?: string | number;
  onChange: (name: string, value: string | number) => void;
  required?: boolean;
  min?: number;
  max?: number;
  className ?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  min,
  max,
  className = "w-full",
}) => {
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (type === "number") {
      const numVal = Number(val);
      if (isNaN(numVal)) {
        setError("please enter valid number");
        return;
      }
      if (min !== undefined && numVal < min) {
        setError(`value must be more than ${min}`);
        return;
      }
      if (max !== undefined && numVal > max) {
        setError(`value must be less than ${max}`);
        return;
      }
      setError("");
      onChange(name, numVal);
    } else {
      setError("");
      onChange(name, val);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        className={`${className} border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputField;
