import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Filter,
  Image as ImageIcon,
  Search,
  Trash2,
} from "lucide-react";

import type {
  Brand,
  BrandsMeta,
} from "../../types/brands.types";

interface BrandsTableProps {
  brands: Brand[];
  meta: BrandsMeta;
  isLoading: boolean;
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}

const BrandsTable = ({
  brands,
  meta,
  isLoading,
  onEdit,
  onDelete,
}: BrandsTableProps) => {
  return (
    <div
      className="
        space-y-6 rounded-2xl
        border border-[#EAECF0]
        bg-white p-6
        shadow-sm
        transition-colors

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Toolbar */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-base font-bold text-[#344054] dark:text-gray-100">
            All Brands
          </h2>

          <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
            {meta.total} {meta.total === 1 ? "brand" : "brands"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search
              size={14}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-[#98A2B3]
              "
            />

            <input
              type="text"
              placeholder="Search brand"
              className="
                w-full rounded-xl
                border border-[#EAECF0]
                bg-[#F8FAF9]
                py-2.5 pl-9 pr-3
                text-xs text-[#344054]
                outline-none transition

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

          <button
            type="button"
            title="Filter"
            className="
              flex h-9 w-9 cursor-pointer
              items-center justify-center
              rounded-xl
              border border-[#EAECF0]
              bg-white
              text-[#667085]
              transition
              hover:bg-[#F8FAF9]

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
              dark:hover:bg-gray-700
            "
          >
            <Filter size={15} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr
              className="
                bg-[#F2F7F4]
                text-xs text-[#667085]
                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <th className="rounded-l-xl px-4 py-3 font-semibold">
                No.
              </th>

              <th className="px-4 py-3 font-semibold">
                Brand
              </th>

              <th className="px-4 py-3 font-semibold">
                Slug
              </th>

              <th className="px-4 py-3 font-semibold">
                Description
              </th>

              <th className="px-4 py-3 font-semibold">
                Products
              </th>

              <th className="px-4 py-3 font-semibold">
                Status
              </th>

              <th className="rounded-r-xl px-4 py-3 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F2F4F7] dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-xs text-[#98A2B3] dark:text-gray-500"
                >
                  Loading brands...
                </td>
              </tr>
            ) : brands.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-xs text-[#98A2B3] dark:text-gray-500"
                >
                  No brands found
                </td>
              </tr>
            ) : (
              brands.map((brand, index) => (
                <tr
                  key={brand.id}
                  className="
                    transition-colors
                    hover:bg-[#F8FAF9]
                    dark:hover:bg-gray-800/50
                  "
                >
                  {/* Number */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="accent-[#48A375]"
                      />

                      <span className="text-xs text-[#667085] dark:text-gray-400">
                        {index + 1}
                      </span>
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          overflow-hidden rounded-xl
                          border border-[#EAECF0]
                          bg-[#F8FAF9]

                          dark:border-gray-700
                          dark:bg-gray-800
                        "
                      >
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <ImageIcon
                            size={17}
                            className="text-[#98A2B3]"
                          />
                        )}
                      </div>

                      <span className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                        {brand.name}
                      </span>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-4 py-3">
                    <span
                      className="
                        rounded-md bg-[#F2F4F7]
                        px-2 py-1
                        text-[11px] font-medium
                        text-[#667085]

                        dark:bg-gray-800
                        dark:text-gray-400
                      "
                    >
                      {brand.slug}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="max-w-[280px] px-4 py-3">
                    <p className="truncate text-xs text-[#667085] dark:text-gray-400">
                      {brand.description || "No description"}
                    </p>
                  </td>

                  {/* Products */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-[#667085] dark:text-gray-400">
                      {brand._count.products}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center gap-1.5
                        rounded-full px-2.5 py-1
                        text-[10px] font-semibold

                        ${
                          brand.isActive
                            ? `
                              bg-emerald-50
                              text-emerald-600
                              dark:bg-emerald-950/40
                              dark:text-emerald-400
                            `
                            : `
                              bg-gray-100
                              text-gray-500
                              dark:bg-gray-800
                              dark:text-gray-400
                            `
                        }
                      `}
                    >
                      <span
                        className={`
                          h-1.5 w-1.5 rounded-full
                          ${
                            brand.isActive
                              ? "bg-emerald-500"
                              : "bg-gray-400"
                          }
                        `}
                      />

                      {brand.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => onEdit(brand)}
                        className="
                          cursor-pointer rounded-lg p-2
                          text-[#98A2B3]
                          transition
                          hover:bg-[#F2F4F7]
                          hover:text-[#344054]

                          dark:hover:bg-gray-800
                          dark:hover:text-gray-200
                        "
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() => onDelete(brand)}
                        className="
                          cursor-pointer rounded-lg p-2
                          text-[#98A2B3]
                          transition
                          hover:bg-red-50
                          hover:text-red-500

                          dark:hover:bg-red-950/30
                          dark:hover:text-red-400
                        "
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
          flex items-center justify-between
          border-t border-[#EAECF0]
          pt-5
          dark:border-gray-800
        "
      >
        <button
          type="button"
          disabled={meta.page <= 1}
          className="
            flex cursor-pointer items-center gap-1
            rounded-xl border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold text-[#667085]
            transition hover:bg-[#F8FAF9]

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

        <span className="text-xs font-medium text-[#98A2B3] dark:text-gray-500">
          Page {meta.page} of {meta.totalPages || 1}
        </span>

        <button
          type="button"
          disabled={meta.page >= meta.totalPages}
          className="
            flex cursor-pointer items-center gap-1
            rounded-xl border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold text-[#667085]
            transition hover:bg-[#F8FAF9]

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

export default BrandsTable;