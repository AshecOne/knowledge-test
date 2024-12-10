import { FormFieldProps } from "@/types";

export const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
}: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
