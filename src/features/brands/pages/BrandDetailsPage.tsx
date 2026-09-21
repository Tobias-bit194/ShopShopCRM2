import { useState } from "react";

import { Button, Spin } from "antd";

import {
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Archive, X } from "lucide-react";

import useBrandDetails from "../hooks/useBrandDetails";

import { deleteBrand } from "../services/brands.service";

import BrandDetailsHeader from "../ui/BrandDetails/BrandDetailsHeader";
import BrandInfoCard from "../ui/BrandDetails/BrandInfoCard";
import BrandProducts from "../ui/BrandDetails/BrandProducts";
import BrandModal from "../ui/BrandModal/BrandModal";

const BrandDetailsPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const {
    brand,
    isLoading,
    error,
    refetch,
  } = useBrandDetails(id);

  // =========================
  // MODALS
  // =========================

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  // =========================
  // ACTIONS
  // =========================

  const handleBack = () => {
    navigate("/brands");
  };

  // EDIT
  const handleEdit = () => {
    if (!brand) return;

    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = async () => {
    await refetch();
  };

  // DELETE / ARCHIVE
  const handleDelete = () => {
    if (!brand) return;

    setDeleteError("");
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    if (isDeleting) return;

    setDeleteError("");
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!brand) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteBrand(brand.id);

      setIsDeleteModalOpen(false);

      navigate("/brands");
    } catch (error: any) {
      console.error(
        "Failed to archive brand:",
        error,
      );

      setDeleteError(
        error.response?.data?.message ||
          "Failed to archive brand. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div
        className="
          flex min-h-[400px]
          items-center justify-center
        "
      >
        <div className="text-center">
          <Spin size="large" />

          <p
            className="
              mt-4
              text-sm
              text-[#667085]

              dark:text-gray-400
            "
          >
            Loading brand...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR / NOT FOUND
  // =========================

  if (error || !brand) {
    return (
      <div
        className="
          flex min-h-[400px]
          items-center justify-center
        "
      >
        <div
          className="
            w-full max-w-md
            rounded-2xl
            border border-[#EAECF0]
            bg-white
            p-8
            text-center
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          {/* Error icon */}
          <div
            className="
              mx-auto
              flex h-12 w-12
              items-center justify-center
              rounded-xl
              bg-red-50
              text-xl
              font-bold
              text-red-500

              dark:bg-red-950/40
              dark:text-red-400
            "
          >
            !
          </div>

          <h2
            className="
              mt-4
              text-lg font-bold
              text-[#101828]

              dark:text-gray-100
            "
          >
            Brand not found
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#667085]

              dark:text-gray-400
            "
          >
            {error ||
              "The requested brand could not be found."}
          </p>

          <div
            className="
              mt-6
              flex justify-center
              gap-3
            "
          >
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
            >
              Back
            </Button>

            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={refetch}
              className="
                !border-none
                !bg-[#48A375]

                hover:!bg-[#3D8C64]
              "
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // BRAND DETAILS
  // =========================

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <BrandDetailsHeader
          brand={brand}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Brand information */}
        <BrandInfoCard brand={brand} />

        {/* Brand products */}
        <BrandProducts
          products={brand.products ?? []}
        />

        {/* Edit Brand Modal */}
        <BrandModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEdit}
          mode="edit"
          brand={brand}
          onSuccess={handleEditSuccess}
        />
      </div>

      {/* ========================= */}
      {/* ARCHIVE MODAL */}
      {/* ========================= */}

      {isDeleteModalOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/40 p-4
            backdrop-blur-[2px]
          "
          onMouseDown={handleCloseDelete}
        >
          <div
            className="
              w-full max-w-[440px]
              overflow-hidden
              rounded-2xl
              border border-[#EAECF0]
              bg-white
              shadow-2xl

              dark:border-gray-800
              dark:bg-gray-900
            "
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >
            {/* Header */}
            <div
              className="
                flex items-start justify-between
                border-b border-[#EAECF0]
                px-6 py-5

                dark:border-gray-800
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-11 w-11
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-red-50
                    text-red-500

                    dark:bg-red-950/40
                    dark:text-red-400
                  "
                >
                  <Archive size={20} />
                </div>

                <div>
                  <h2
                    className="
                      text-base font-bold
                      text-[#344054]

                      dark:text-gray-100
                    "
                  >
                    Archive Brand
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-[#98A2B3]

                      dark:text-gray-500
                    "
                  >
                    This action will archive the
                    brand.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDelete}
                disabled={isDeleting}
                className="
                  flex h-9 w-9
                  cursor-pointer
                  items-center justify-center
                  rounded-lg
                  text-[#98A2B3]
                  transition

                  hover:bg-[#F2F4F7]
                  hover:text-[#344054]

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:hover:bg-gray-800
                  dark:hover:text-gray-200
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p
                className="
                  text-sm leading-6
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Are you sure you want to archive{" "}
                <span
                  className="
                    font-semibold
                    text-[#344054]

                    dark:text-gray-200
                  "
                >
                  {brand.name}
                </span>
                ?
              </p>

              <p
                className="
                  mt-2
                  text-xs leading-5
                  text-[#98A2B3]

                  dark:text-gray-500
                "
              >
                The brand will no longer be
                available as an active brand.
              </p>

              {/* Error */}
              {deleteError && (
                <div
                  className="
                    mt-4
                    rounded-xl
                    border border-red-200
                    bg-red-50
                    px-4 py-3
                    text-xs font-medium
                    text-red-600

                    dark:border-red-900
                    dark:bg-red-950/30
                    dark:text-red-400
                  "
                >
                  {deleteError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="
                flex justify-end gap-3
                border-t border-[#EAECF0]
                px-6 py-4

                dark:border-gray-800
              "
            >
              <button
                type="button"
                onClick={handleCloseDelete}
                disabled={isDeleting}
                className="
                  cursor-pointer
                  rounded-lg
                  border border-[#EAECF0]
                  bg-white
                  px-5 py-2.5
                  text-xs font-semibold
                  text-[#667085]
                  transition

                  hover:bg-[#F8FAF9]

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-gray-300
                  dark:hover:bg-gray-800
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="
                  cursor-pointer
                  rounded-lg
                  bg-red-500
                  px-5 py-2.5
                  text-xs font-semibold
                  text-white
                  transition

                  hover:bg-red-600

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isDeleting
                  ? "Archiving..."
                  : "Archive Brand"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandDetailsPage;