import Image from "next/image";

interface ProductImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  disabled: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const ProductImageUpload = ({
  imagePreview,
  onImageChange,
  onImageRemove,
  disabled,
  fileInputRef,
}: ProductImageUploadProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Product Image
    </label>
    <div className="mt-1 flex items-center space-x-4">
      {imagePreview ? (
        <div className="relative w-32 h-32">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <span className="sr-only">Remove image</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500"
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-500">Click to upload</div>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
        disabled={disabled}
      />
    </div>
    <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
  </div>
);
