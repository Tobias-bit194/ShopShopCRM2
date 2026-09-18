import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Filter,
  Image as ImageIcon,
  Search,
  Trash2,
} from "lucide-react";

import type { Product } from "../../types/products.types";
import { deleteProduct } from "../../services/products.service";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onSuccess?: () => void;
}

const ProductsTable = ({
  products,
  isLoading,
  onEdit,
  onSuccess,
}: ProductsTableProps) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const pageSize = 10;

  /* =========================
     FILTER
  ========================= */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category?.name
          ?.toLowerCase()
          .includes(query) ||
        product.brand?.name
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [products, search]);

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(product.id);

      await deleteProduct(product.id);

      onSuccess?.();
    } catch (error) {
      console.error(
        "Failed to delete product:",
        error,
      );

      window.alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

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
            All Products
          </h2>

          <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
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
              value={search}
              onChange={handleSearch}
              placeholder="Search product"
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
                dark:placeholder:text-gray-500
              "
            />
          </div>

          {/* Filter */}
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
                Product
              </th>

              <th className="px-4 py-3 font-semibold">
                Category
              </th>

              <th className="px-4 py-3 font-semibold">
                Brand
              </th>

              <th className="px-4 py-3 font-semibold">
                Price
              </th>

              <th className="px-4 py-3 font-semibold">
                Stock
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
                  colSpan={8}
                  className="
                    px-4 py-12 text-center
                    text-xs text-[#98A2B3]
                    dark:text-gray-500
                  "
                >
                  Loading products...
                </td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-4 py-12 text-center
                    text-xs text-[#98A2B3]
                    dark:text-gray-500
                  "
                >
                  No products found
                </td>
              </tr>
            ) : (
              paginatedProducts.map(
                (product, index) => {
                  const mainImage =
                    product.images?.find(
                      (image) => image.isMain,
                    )?.url ??
                    product.images?.[0]?.url;

                  const globalIndex =
                    (safeCurrentPage - 1) *
                      pageSize +
                    index +
                    1;

                  const isDeleting =
                    deletingId === product.id;

                  return (
                    <tr
                      key={product.id}
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
                            className="
                              cursor-pointer
                              accent-[#48A375]
                            "
                          />

                          <span className="text-xs text-[#667085] dark:text-gray-400">
                            {globalIndex}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex min-w-[180px] items-center gap-3">
                          <div
                            className="
                              flex h-11 w-11 shrink-0
                              items-center justify-center
                              overflow-hidden rounded-xl
                              border border-[#EAECF0]
                              bg-[#F8FAF9]

                              dark:border-gray-700
                              dark:bg-gray-800
                            "
                          >
                            {mainImage ? (
                              <img
                                src={mainImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon
                                size={18}
                                className="text-[#98A2B3] dark:text-gray-500"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                max-w-[180px] truncate
                                text-xs font-semibold
                                text-[#344054]

                                dark:text-gray-200
                              "
                            >
                              {product.name}
                            </p>

                            <p
                              className="
                                mt-1 max-w-[180px] truncate
                                text-[10px]
                                text-[#98A2B3]

                                dark:text-gray-500
                              "
                            >
                              SKU:{" "}
                              {product.sku || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-[#667085] dark:text-gray-400">
                          {product.category
                            ?.name || "—"}
                        </span>
                      </td>

                      {/* Brand */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-[#667085] dark:text-gray-400">
                          {product.brand?.name ||
                            "—"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        <div>
                          <p className="whitespace-nowrap text-xs font-semibold text-[#344054] dark:text-gray-200">
                            {product.price.toLocaleString()}{" "}
                            UZS
                          </p>

                          {product.oldPrice !==
                            null &&
                            product.oldPrice !==
                              product.price && (
                              <p
                                className="
                                  mt-0.5 whitespace-nowrap
                                  text-[10px]
                                  text-[#98A2B3]
                                  line-through

                                  dark:text-gray-500
                                "
                              >
                                {product.oldPrice.toLocaleString()}{" "}
                                UZS
                              </p>
                            )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                            {
                              product.availableStock
                            }
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#98A2B3] dark:text-gray-500">
                            of {product.stock}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`
                            inline-flex rounded-full
                            px-2.5 py-1
                            text-[10px] font-semibold

                            ${
                              product.isActive
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
                          {product.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit"
                            disabled={isDeleting}
                            onClick={() =>
                              onEdit(product)
                            }
                            className="
                              cursor-pointer rounded-lg p-2
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
                            disabled={isDeleting}
                            onClick={() =>
                              handleDelete(product)
                            }
                            className="
                              cursor-pointer rounded-lg p-2
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
          disabled={safeCurrentPage === 1}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1),
            )
          }
          className="
            flex cursor-pointer items-center gap-1
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

        <span className="text-xs font-medium text-[#98A2B3] dark:text-gray-500">
          Page {safeCurrentPage} of {totalPages}
        </span>

        <button
          type="button"
          disabled={
            safeCurrentPage === totalPages
          }
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                totalPages,
              ),
            )
          }
          className="
            flex cursor-pointer items-center gap-1
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

export default ProductsTable;