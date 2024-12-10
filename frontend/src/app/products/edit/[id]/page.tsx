"use client";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductForm from "@/components/products/ProductForm";
import CenteredSpinner from "@/components/common/CenteredSpinner";
import { PageContainer } from "@/components/layout/PageContainer";

export default function EditProductPage() {
  const { isAuthenticated, isInitialized } = useAuth();
  const params = useParams();
  const { products, loading } = useSelector(
    (state: RootState) => state.product
  );
  const product = products.find((p) => p.id === Number(params.id));

  if (!isInitialized) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !product) {
    return <CenteredSpinner />;
  }

  return (
    <PageContainer
      title="Edit Product"
      description="Update your product information."
    >
      <ProductForm initialData={product} isEdit />
    </PageContainer>
  );
}
