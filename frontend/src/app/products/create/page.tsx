"use client";
import { useAuth } from "@/hooks/useAuth";
import ProductForm from "@/components/products/ProductForm";
import CenteredSpinner from "@/components/common/CenteredSpinner";
import { PageContainer } from "@/components/layout/PageContainer";

export default function CreateProductPage() {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageContainer
      title="Create New Product"
      description="Add a new product to your inventory."
    >
      <ProductForm />
    </PageContainer>
  );
}
