import { useState } from "react";

import useBrands from "../hooks/useBrands";
import { deleteBrand } from "../services/brands.service";

import type { Brand } from "../types/brands.types";

import BrandsHeader from "../ui/BrandsHeader/BrandsHeader";
import BrandsGrid from "../ui/BrandsGrid/BrandsGrid";
import BrandsTable from "../ui/BrandsTable/BrandsTable";
import BrandModal from "../ui/BrandModal/BrandModal";

const BrandsPage = () => {
  const {
    brands,
    meta,
    isLoading,
    error,
    refetch,
  } = useBrands();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] =
    useState<"create" | "edit">("create");

  const [selectedBrand, setSelectedBrand] =
    useState<Brand | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // CREATE
  const handleOpenCreate = () => {
    setSelectedBrand(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  // EDIT
  const handleOpenEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  // DELETE
  const handleDelete = async (brand: Brand) => {
    const confirmed = window.confirm(
      `Are you sure you want to archive "${brand.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(brand.id);

      await deleteBrand(brand.id);

      await refetch();
    } catch (error: any) {
      console.error("Failed to delete brand:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete brand.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BrandsHeader
        onAddBrand={handleOpenCreate}
      />

      {/* Brands Grid */}
      <BrandsGrid
        brands={brands}
        isLoading={isLoading}
        error={error}
      />

      {/* Brands Table */}
      <BrandsTable
        brands={brands}
        meta={meta}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Create / Edit Modal */}
      <BrandModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        brand={selectedBrand}
        onSuccess={refetch}
      />

      {/* Delete loading */}
      {deletingId && (
        <div
          className="
            fixed bottom-5 right-5 z-50
            rounded-xl
            border border-[#EAECF0]
            bg-white px-4 py-3
            text-xs font-semibold
            text-[#667085]
            shadow-lg

            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-300
          "
        >
          Archiving brand...
        </div>
      )}
    </div>
  );
};

export default BrandsPage;