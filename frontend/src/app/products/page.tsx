"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts, deleteProduct } from "@/redux/thunks/productThunks";
import { useAuth } from "@/hooks/useAuth";
import CenteredSpinner from "@/components/common/CenteredSpinner";
import { PageContainer } from "@/components/layout/PageContainer";
import Image from "next/image";
import { showToast } from "@/utils/toast";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const { token } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts());
    }
  }, [dispatch, token]);

  if (!isInitialized) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const formatToRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const getImageUrl = (path: string) => {
  if (process.env.NODE_ENV === "production") {
    return `https://ecological-admitted-dallas-review.trycloudflare.com${path}`;
  }
  return `http://localhost:3001${path}`;
};

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const result = await dispatch(deleteProduct(id)).unwrap();
        if (result) {
          showToast.success("Product deleted successfully!");
        }
      } catch (err) {
        showToast.error("Failed to delete product");
      }
    }
  };

  return (
    <PageContainer title="My Products" description="">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/products/create")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add New Product
        </button>
      </div>
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}
      {loading ? (
        <CenteredSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                {product.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatToRupiah(product.price)}
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button
                  onClick={() => router.push(`/products/edit/${product.id}`)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven&apos;t added any products yet.
          </p>
          <button
            onClick={() => router.push("/products/create")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </PageContainer>
  );
}
