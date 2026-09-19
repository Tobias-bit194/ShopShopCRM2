import { Image as ImageIcon } from "lucide-react";

import type { Brand } from "../../types/brands.types";

interface BrandsGridProps {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
}

const BrandsGrid = ({
  brands,
  isLoading,
  error,
}: BrandsGridProps) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-8 text-center text-xs text-[#98A2B3] dark:border-gray-800 dark:bg-gray-900">
        Loading brands...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-xs text-red-500 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-8 text-center text-xs text-[#98A2B3] dark:border-gray-800 dark:bg-gray-900">
        No brands found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {brands.slice(0, 8).map((brand) => (
        <div
          key={brand.id}
          className="
            group flex items-center gap-4
            rounded-2xl border border-[#EAECF0]
            bg-white p-4 shadow-sm
            transition-all duration-200

            hover:-translate-y-0.5
            hover:border-[#48A375]
            hover:shadow-md

            dark:border-gray-800
            dark:bg-gray-900
            dark:hover:border-emerald-600
          "
        >
          {/* Logo */}
          <div
            className="
              flex h-14 w-14 shrink-0
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
                size={23}
                className="text-[#98A2B3] dark:text-gray-500"
              />
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="
                  truncate text-sm font-bold
                  text-[#344054]
                  transition-colors

                  group-hover:text-[#48A375]
                  dark:text-gray-100
                  dark:group-hover:text-emerald-400
                "
              >
                {brand.name}
              </h3>

              <span
                className={`
                  h-2 w-2 shrink-0 rounded-full
                  ${
                    brand.isActive
                      ? "bg-[#48A375]"
                      : "bg-[#98A2B3]"
                  }
                `}
                title={brand.isActive ? "Active" : "Inactive"}
              />
            </div>

            <p
              className="
                mt-1 line-clamp-2
                text-[11px] leading-4
                text-[#98A2B3]
                dark:text-gray-500
              "
            >
              {brand.description || "No description"}
            </p>

            <p className="mt-2 text-[10px] text-[#98A2B3] dark:text-gray-500">
              {brand._count.products}{" "}
              {brand._count.products === 1
                ? "product"
                : "products"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandsGrid;