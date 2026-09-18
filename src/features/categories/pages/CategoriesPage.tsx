import { useState } from "react";

import useCategories from "../hooks/useCategories";
import { deleteCategory } from "../services/categories.service";

import type { Category } from "../types/categories.types";

import CategoriesHeader from "../ui/CategoriesHeader/CategoriesHeader";
import CategoriesGrid from "../ui/CategoriesGrid/CategoriesGrid";
import CategoriesTable from "../ui/CategoriesTable/CategoriesTable";
import CategoryModal from "../ui/CategoryModal/CategoryModal";

const CategoriesPage = () => {
  const {
    categories,
    isLoading,
    error,
    refetch,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] =
    useState<"create" | "edit">("create");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // CREATE
  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  // EDIT
  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // DELETE
  const handleDelete = async (category: Category) => {
    const confirmed = window.confirm(
      `Are you sure you want to archive "${category.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(category.id);

      await deleteCategory(category.id);

      await refetch();
    } catch (error: any) {
      console.error("Failed to delete category:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete category.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CategoriesHeader
        onAddCategory={handleOpenCreate}
      />

      {/* Categories Grid */}
      <CategoriesGrid
        categories={categories}
        isLoading={isLoading}
        error={error}
      />

      {/* Categories Table */}
      <CategoriesTable
        categories={categories}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Create / Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        category={selectedCategory}
        categories={categories}
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
          Archiving category...
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;