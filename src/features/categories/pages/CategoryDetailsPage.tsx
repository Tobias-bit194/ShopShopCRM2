import { ArrowLeft, Image as ImageIcon, Package, Layers3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import useCategory from "../hooks/useCategory";

const CategoryDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { category, isLoading, error } = useCategory(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-[#98A2B3] dark:text-gray-500">
          Loading category...
        </p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">
          {error || "Category not found"}
        </p>

        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="
            rounded-lg bg-[#48A375]
            px-4 py-2
            text-xs font-semibold text-white
            transition hover:bg-[#3D8C64]
          "
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/categories")}
        className="
          flex cursor-pointer items-center gap-2
          text-xs font-semibold text-[#667085]
          transition hover:text-[#48A375]

          dark:text-gray-400
          dark:hover:text-emerald-400
        "
      >
        <ArrowLeft size={16} />
        Back to Categories
      </button>

      {/* Category information */}
      <div
        className="
          rounded-2xl border border-[#EAECF0]
          bg-white p-6 shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            {/* Category image */}
            <div
              className="
                flex h-20 w-20 shrink-0
                items-center justify-center
                overflow-hidden rounded-2xl
                border border-[#EAECF0]
                bg-[#F8FAF9]

                dark:border-gray-700
                dark:bg-gray-800
              "
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon
                  size={28}
                  className="text-[#98A2B3] dark:text-gray-500"
                />
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-[#173D35] dark:text-white">
                  {category.name}
                </h1>

                <span
                  className={`
                    rounded-full px-2.5 py-1
                    text-[10px] font-semibold

                    ${
                      category.isActive
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }
                  `}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
                {category.description || "No description"}
              </p>

              <p className="mt-2 text-[11px] text-[#98A2B3] dark:text-gray-500">
                /{category.slug}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div
              className="
                flex min-w-[120px] items-center gap-3
                rounded-xl border border-[#EAECF0]
                bg-[#F8FAF9] px-4 py-3

                dark:border-gray-700
                dark:bg-gray-800
              "
            >
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg bg-[#EAF7F0]
                  text-[#48A375]

                  dark:bg-emerald-950
                  dark:text-emerald-400
                "
              >
                <Package size={17} />
              </div>

              <div>
                <p className="text-base font-bold text-[#344054] dark:text-white">
                  {category._count.products}
                </p>

                <p className="text-[10px] text-[#98A2B3] dark:text-gray-500">
                  Products
                </p>
              </div>
            </div>

            <div
              className="
                flex min-w-[120px] items-center gap-3
                rounded-xl border border-[#EAECF0]
                bg-[#F8FAF9] px-4 py-3

                dark:border-gray-700
                dark:bg-gray-800
              "
            >
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg bg-[#EAF7F0]
                  text-[#48A375]

                  dark:bg-emerald-950
                  dark:text-emerald-400
                "
              >
                <Layers3 size={17} />
              </div>

              <div>
                <p className="text-base font-bold text-[#344054] dark:text-white">
                  {category._count.children}
                </p>

                <p className="text-[10px] text-[#98A2B3] dark:text-gray-500">
                  Subcategories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div
        className="
          rounded-2xl border border-[#EAECF0]
          bg-white p-6 shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="mb-5">
          <h2 className="text-base font-bold text-[#344054] dark:text-gray-100">
            Products
          </h2>

          <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
            Products assigned to {category.name}
          </p>
        </div>

        {category.products.length === 0 ? (
          <div
            className="
              flex min-h-[180px] flex-col
              items-center justify-center
              rounded-xl border border-dashed border-[#EAECF0]

              dark:border-gray-700
            "
          >
            <Package
              size={28}
              className="mb-3 text-[#98A2B3] dark:text-gray-600"
            />

            <p className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              No products in this category
            </p>
          </div>
        ) : (
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
                    Product
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    SKU
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Price
                  </th>

                  <th className="rounded-r-xl px-4 py-3 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F2F4F7] dark:divide-gray-800">
                {category.products.map((product) => (
                  <tr
                    key={product.id}
                    className="
                      transition-colors
                      hover:bg-[#F8FAF9]
                      dark:hover:bg-gray-800/50
                    "
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
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
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon
                              size={17}
                              className="text-[#98A2B3]"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-[#344054] dark:text-gray-200">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#98A2B3] dark:text-gray-500">
                            /{product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          rounded-md bg-[#F2F4F7]
                          px-2 py-1
                          text-[11px] font-medium text-[#667085]

                          dark:bg-gray-800
                          dark:text-gray-400
                        "
                      >
                        {product.sku}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                        {product.price.toLocaleString()} UZS
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`
                          rounded-full px-2.5 py-1
                          text-[10px] font-semibold

                          ${
                            product.isActive
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                          }
                        `}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailsPage;