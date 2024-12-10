"use client";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { createProduct, updateProduct } from "@/redux/thunks/productThunks";
import { Product } from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ProductImageUpload } from "./ProductImageUpload";
import { showToast } from "@/utils/toast";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ProductFormField } from "./ProductFormField";

interface ProductFormProps {
  initialData?: Product;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.product);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    image: initialData?.image || "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast.error("File size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setFormData({ ...formData, image: file as unknown as string });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setFormData({ ...formData, price: value ? parseInt(value) : 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Form data being sent:", formData);
      const submitData = createFormData();
      await handleProductSubmission(submitData);

      showToast.success(
        `Product ${isEdit ? "updated" : "created"} successfully!`
      );
      router.push("/products");
    } catch (err) {
      console.error("Submission error:", err);
      showToast.error(
        (err as Error).message ||
          `Failed to ${isEdit ? "update" : "create"} product`
      );
    }
  };

  const validateForm = () => {
    if (formData.price <= 0) {
      showToast.error("Price must be greater than 0");
      return false;
    }
    return true;
  };

  const createFormData = () => {
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price.toString());
    if (formData.image && typeof formData.image !== "string") {
      submitData.append("image", formData.image);
    }
    return submitData;
  };

  const handleProductSubmission = async (submitData: FormData) => {
    if (isEdit && initialData?.id) {
      await dispatch(
        updateProduct({ id: initialData.id, formData: submitData })
      ).unwrap();
    } else {
      await dispatch(createProduct(submitData)).unwrap();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      <ProductImageUpload
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        onImageRemove={() => {
          setImagePreview(null);
          setFormData({ ...formData, image: "" });
        }}
        disabled={loading}
        fileInputRef={fileInputRef}
      />

      <ProductFormField
        label="Product Name"
        id="name"
        value={formData.name}
        onInputChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        disabled={loading}
        placeholder="Enter product name"
      />

      <ProductFormField
        label="Description"
        id="description"
        value={formData.description}
        onTextAreaChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        disabled={loading}
        placeholder="Enter product description"
        isTextArea
        rows={4}
      />

      <ProductFormField
        label="Price"
        id="price"
        value={
          formData.price === 0 ? "" : formData.price.toLocaleString("id-ID")
        }
        onInputChange={handlePriceChange}
        disabled={loading}
        placeholder="0"
        prefix="Rp"
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <LoadingSpinner />
              <span className="ml-2">
                {isEdit ? "Updating..." : "Creating..."}
              </span>
            </div>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
}
