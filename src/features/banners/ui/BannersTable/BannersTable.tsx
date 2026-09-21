import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Image as ImageIcon,
  Search,
  Trash2,
} from "lucide-react";

import { Switch } from "antd";

import type {
  Banner,
  BannersMeta,
} from "../../types/banners.types";

interface BannersTableProps {
  banners: Banner[];
  meta: BannersMeta;
  isLoading: boolean;

  onEdit: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
  onStatusChange: (banner: Banner) => void;

  deletingId: string | null;
  statusLoadingId: string | null;
}

const formatDate = (
  value: string | null,
) => {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getSchedule = (banner: Banner) => {
  const start = formatDate(banner.startDate);
  const end = formatDate(banner.endDate);

  if (!start && !end) {
    return "Always";
  }

  if (start && end) {
    return `${start} — ${end}`;
  }

  if (start) {
    return `From ${start}`;
  }

  return `Until ${end}`;
};

const BannersTable = ({
  banners,
  meta,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  deletingId,
  statusLoadingId,
}: BannersTableProps) => {
  const [search, setSearch] = useState("");

  // =========================
  // SEARCH
  // =========================

  const filteredBanners = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return banners;
    }

    return banners.filter((banner) => {
      return (
        banner.title
          .toLowerCase()
          .includes(query) ||
        banner.subtitle
          ?.toLowerCase()
          .includes(query) ||
        banner.buttonText
          ?.toLowerCase()
          .includes(query) ||
        banner.link
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [banners, search]);

  return (
    <div
      className="
        space-y-6
        rounded-2xl
        border border-[#EAECF0]
        bg-white p-6
        shadow-sm
        transition-colors

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* ========================= */}
      {/* TOOLBAR */}
      {/* ========================= */}

      <div
        className="
          flex flex-col
          justify-between gap-4

          md:flex-row
          md:items-center
        "
      >
        <div>
          <h2
            className="
              text-base font-bold
              text-[#344054]

              dark:text-gray-100
            "
          >
            All Banners
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              text-[#98A2B3]

              dark:text-gray-500
            "
          >
            {meta.total}{" "}
            {meta.total === 1
              ? "banner"
              : "banners"}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="
              absolute left-3
              top-1/2
              -translate-y-1/2
              text-[#98A2B3]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search banner"
            className="
              w-full
              rounded-xl
              border border-[#EAECF0]
              bg-[#F8FAF9]
              py-2.5
              pl-9 pr-3
              text-xs
              text-[#344054]
              outline-none
              transition

              placeholder:text-[#98A2B3]

              focus:border-[#48A375]
              focus:ring-2
              focus:ring-[#48A375]/10

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-100
            "
          />
        </div>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            min-w-[1000px]
            border-collapse
            text-left
          "
        >
          <thead>
            <tr
              className="
                bg-[#F2F7F4]
                text-xs
                text-[#667085]

                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <th className="rounded-l-xl px-4 py-3 font-semibold">
                No.
              </th>

              <th className="px-4 py-3 font-semibold">
                Banner
              </th>

              <th className="px-4 py-3 font-semibold">
                Schedule
              </th>

              <th className="px-4 py-3 text-center font-semibold">
                Order
              </th>

              <th className="px-4 py-3 text-center font-semibold">
                Status
              </th>

              <th className="rounded-r-xl px-4 py-3 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody
            className="
              divide-y
              divide-[#F2F4F7]

              dark:divide-gray-800
            "
          >
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-4 py-12
                    text-center
                    text-xs
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  Loading banners...
                </td>
              </tr>
            ) : filteredBanners.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    px-4 py-12
                    text-center
                    text-xs
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  {search
                    ? "No banners match your search"
                    : "No banners found"}
                </td>
              </tr>
            ) : (
              filteredBanners.map(
                (banner, index) => {
                  const isDeleting =
                    deletingId === banner.id;

                  const isStatusLoading =
                    statusLoadingId === banner.id;

                  return (
                    <tr
                      key={banner.id}
                      className="
                        transition-colors

                        hover:bg-[#F8FAF9]

                        dark:hover:bg-gray-800/50
                      "
                    >
                      {/* Number */}
                      <td className="px-4 py-3">
                        <span
                          className="
                            text-xs
                            text-[#667085]

                            dark:text-gray-400
                          "
                        >
                          {index + 1}
                        </span>
                      </td>

                      {/* Banner */}
                      <td className="px-4 py-3">
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          {/* Image */}
                          <div
                            className="
                              flex h-12 w-20
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-lg
                              border
                              border-[#EAECF0]
                              bg-[#F8FAF9]

                              dark:border-gray-700
                              dark:bg-gray-800
                            "
                          >
                            {banner.image ? (
                              <img
                                src={banner.image}
                                alt={banner.title}
                                className="
                                  h-full w-full
                                  object-cover
                                "
                              />
                            ) : (
                              <ImageIcon
                                size={17}
                                className="
                                  text-[#98A2B3]

                                  dark:text-gray-500
                                "
                              />
                            )}
                          </div>

                          {/* Text */}
                          <div className="min-w-0">
                            <p
                              className="
                                max-w-[220px]
                                truncate
                                text-xs
                                font-semibold
                                text-[#344054]

                                dark:text-gray-200
                              "
                            >
                              {banner.title}
                            </p>

                            <p
                              className="
                                mt-1
                                max-w-[220px]
                                truncate
                                text-[10px]
                                text-[#98A2B3]

                                dark:text-gray-500
                              "
                            >
                              {banner.subtitle ||
                                "No subtitle"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Schedule */}
                      <td className="px-4 py-3">
                        <span
                          className="
                            text-[11px]
                            font-medium
                            text-[#667085]

                            dark:text-gray-400
                          "
                        >
                          {getSchedule(banner)}
                        </span>
                      </td>

                      {/* Sort Order */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className="
                            inline-flex
                            min-w-8
                            justify-center
                            rounded-lg
                            bg-[#F2F4F7]
                            px-2 py-1
                            text-[11px]
                            font-semibold
                            text-[#667085]

                            dark:bg-gray-800
                            dark:text-gray-300
                          "
                        >
                          {banner.sortOrder}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                          "
                        >
                          <Switch
                            size="small"
                            checked={
                              banner.isActive
                            }
                            loading={
                              isStatusLoading
                            }
                            disabled={
                              isDeleting ||
                              isStatusLoading
                            }
                            onChange={() =>
                              onStatusChange(
                                banner,
                              )
                            }
                            className="
                              [&.ant-switch-checked]:!bg-[#48A375]
                            "
                          />

                          <span
                            className={`
                              text-[10px]
                              font-semibold

                              ${
                                banner.isActive
                                  ? `
                                    text-emerald-600
                                    dark:text-emerald-400
                                  `
                                  : `
                                    text-[#98A2B3]
                                    dark:text-gray-500
                                  `
                              }
                            `}
                          >
                            {banner.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div
                          className="
                            flex
                            items-center
                            justify-end
                            gap-1
                          "
                        >
                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit"
                            disabled={
                              isDeleting ||
                              isStatusLoading
                            }
                            onClick={() =>
                              onEdit(banner)
                            }
                            className="
                              cursor-pointer
                              rounded-lg p-2
                              text-[#98A2B3]
                              transition

                              hover:bg-[#F2F4F7]
                              hover:text-[#344054]

                              disabled:cursor-not-allowed
                              disabled:opacity-40

                              dark:hover:bg-gray-800
                              dark:hover:text-gray-200
                            "
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete"
                            disabled={
                              isDeleting ||
                              isStatusLoading
                            }
                            onClick={() =>
                              onDelete(banner)
                            }
                            className="
                              cursor-pointer
                              rounded-lg p-2
                              text-[#98A2B3]
                              transition

                              hover:bg-red-50
                              hover:text-red-500

                              disabled:cursor-not-allowed
                              disabled:opacity-40

                              dark:hover:bg-red-950/30
                              dark:hover:text-red-400
                            "
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}

      <div
        className="
          flex items-center
          justify-between
          border-t
          border-[#EAECF0]
          pt-5

          dark:border-gray-800
        "
      >
        <button
          type="button"
          disabled={meta.page <= 1}
          className="
            flex cursor-pointer
            items-center gap-1
            rounded-xl
            border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold
            text-[#667085]
            transition

            hover:bg-[#F8FAF9]

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        <span
          className="
            text-xs font-medium
            text-[#98A2B3]

            dark:text-gray-500
          "
        >
          Page {meta.page} of{" "}
          {meta.totalPages || 1}
        </span>

        <button
          type="button"
          disabled={
            meta.page >= meta.totalPages
          }
          className="
            flex cursor-pointer
            items-center gap-1
            rounded-xl
            border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold
            text-[#667085]
            transition

            hover:bg-[#F8FAF9]

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BannersTable;