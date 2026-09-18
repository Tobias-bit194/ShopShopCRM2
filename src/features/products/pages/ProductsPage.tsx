import { useState } from "react";

import useProducts from "../hooks/useProducts";
import useBrands from "../hooks/useBrands";
import useCategories from "../../categories/hooks/useCategories";

import ProductsHeader from "../ui/ProductsHeader/ProductsHeader";
import ProductsTable from "../ui/ProductsTable/ProductsTable";
import ProductDriver from "../ui/ProductDriver/ProductDriver";

import type { Product } from "../types/products.types";

const ProductsPage = () => {
  /* =========================
     DATA
  ========================= */

  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    brands,
    isLoading: isBrandsLoading,
    error: brandsError,
  } = useBrands();

  /* =========================
     DRIVER
  ========================= */

  const [isDriverOpen, setIsDriverOpen] =
    useState(false);

  const [driverMode, setDriverMode] =
    useState<"create" | "edit">("create");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  /* =========================
     CREATE
  ========================= */

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setDriverMode("create");
    setIsDriverOpen(true);
  };

  /* =========================
     EDIT
  ========================= */

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setDriverMode("edit");
    setIsDriverOpen(true);
  };

  /* =========================
     CLOSE
  ========================= */

  const handleCloseDriver = () => {
    setIsDriverOpen(false);
    setSelectedProduct(null);
  };

  /* =========================
     SUCCESS
  ========================= */

  const handleSuccess = async () => {
    await refetchProducts();

    setIsDriverOpen(false);
    setSelectedProduct(null);
  };

  /* =========================
     ERRORS
  ========================= */

  const error =
    productsError ||
    categoriesError ||
    brandsError;

  return (
    <div className="space-y-6">
      <ProductsHeader
        onAddProduct={handleOpenCreate}
      />

      {error && (
        <div
          className="
            rounded-xl
            border border-red-200
            bg-red-50
            px-4 py-3
            text-xs text-red-500

            dark:border-red-900
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      <ProductsTable
        products={products}
        isLoading={isProductsLoading}
        onEdit={handleOpenEdit}
        onSuccess={refetchProducts}
      />

      <ProductDriver
        isOpen={isDriverOpen}
        onClose={handleCloseDriver}
        mode={driverMode}
        product={selectedProduct}
        categories={categories}
        brands={brands}
        isCategoriesLoading={isCategoriesLoading}
        isBrandsLoading={isBrandsLoading}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ProductsPage;