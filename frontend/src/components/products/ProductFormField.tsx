interface ProductFormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
  prefix?: string;
}

export const ProductFormField = ({
  label,
  id,
  type = "text",
  value,
  onInputChange,
  onTextAreaChange,
  disabled = false,
  placeholder,
  isTextArea = false,
  rows,
  prefix,
}: ProductFormFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onTextAreaChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        disabled={disabled}
        placeholder={placeholder}
      />
    ) : (
      <div className="relative mt-1 rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onInputChange}
          className={`block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            prefix ? "pl-12" : ""
          }`}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    )}
  </div>
);
