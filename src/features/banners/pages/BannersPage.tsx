import { useState } from "react";

import useBanners from "../hooks/useBanners";

import {
    deleteBanner,
    updateBannerStatus,
} from "../services/banners.service";

import type { Banner } from "../types/banners.types";

import BannersHeader from "../ui/BannersHeader/BannersHeader";
import BannersGrid from "../ui/BannersGrid/BannersGrid";
import BannersTable from "../ui/BannersTable/BannersTable";
import BannerModal from "../ui/BannerModal/BannerModal";

const BannersPage = () => {
    const {
        banners,
        meta,
        isLoading,
        error,
        refetch,
    } = useBanners();

    // =========================
    // MODAL
    // =========================

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [modalMode, setModalMode] =
        useState<"create" | "edit">("create");

    const [selectedBanner, setSelectedBanner] =
        useState<Banner | null>(null);

    // =========================
    // ACTION LOADING
    // =========================

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [statusLoadingId, setStatusLoadingId] =
        useState<string | null>(null);

    // =========================
    // CREATE
    // =========================

    const handleOpenCreate = () => {
        setSelectedBanner(null);
        setModalMode("create");
        setIsModalOpen(true);
    };

    // =========================
    // EDIT
    // =========================

    const handleOpenEdit = (
        banner: Banner,
    ) => {
        setSelectedBanner(banner);
        setModalMode("edit");
        setIsModalOpen(true);
    };

    // =========================
    // CLOSE MODAL
    // =========================

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBanner(null);
    };

    // =========================
    // DELETE
    // =========================

    const handleDelete = async (
        banner: Banner,
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to archive "${banner.title}"?`,
        );

        if (!confirmed) return;

        try {
            setDeletingId(banner.id);

            await deleteBanner(banner.id);

            await refetch();
        } catch (error: any) {
            console.error(
                "Failed to delete banner:",
                error,
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete banner.",
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =========================
    // STATUS
    // =========================

    const handleStatusChange = async (
        banner: Banner,
    ) => {
        try {
            setStatusLoadingId(banner.id);

            await updateBannerStatus(
                banner.id,
                {
                    isActive: !banner.isActive,
                },
            );

            await refetch();
        } catch (error: any) {
            console.error(
                "Failed to update banner status:",
                error,
            );

            alert(
                error.response?.data?.message ||
                "Failed to update banner status.",
            );
        } finally {
            setStatusLoadingId(null);
        }
    };

    // =========================
    // SUCCESS
    // =========================

    const handleSuccess = async () => {
        await refetch();
    };

    return (
        <div className="space-y-6">
            {/* Header */}

            <BannersHeader
                onAddBanner={handleOpenCreate}
            />

            {/* Banner cards */}

            <BannersGrid
                banners={banners}
                isLoading={isLoading}
                error={error}
                onEdit={handleOpenEdit}
            />

            {/* Banner table */}

            <BannersTable
                banners={banners}
                meta={meta}
                isLoading={isLoading}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
                onStatusChange={
                    handleStatusChange
                }
                deletingId={deletingId}
                statusLoadingId={
                    statusLoadingId
                }
            />

            {/* Create / Edit */}

            <BannerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                banner={selectedBanner}
                onSuccess={handleSuccess}
            />

            {/* Delete notification */}

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
                    Archiving banner...
                </div>
            )}
        </div>
    );
};

export default BannersPage;