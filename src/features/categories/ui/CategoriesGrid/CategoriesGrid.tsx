import { Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Category } from "../../types/categories.types";

interface CategoriesGridProps {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const CategoriesGrid = ({
  categories,
  isLoading,
  error,
}: CategoriesGridProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-8 text-center text-xs text-[#98A2B3] dark:border-gray-800 dark:bg-gray-900">
        Loading categories...
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

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-8 text-center text-xs text-[#98A2B3] dark:border-gray-800 dark:bg-gray-900">
        No categories found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.slice(0, 8).map((category) => (
        <div
          key={category.id}
          onClick={() => navigate(`/categories/${category.id}`)}
          className="
            group flex cursor-pointer items-center gap-4
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
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon
                size={23}
                className="text-[#98A2B3] dark:text-gray-500"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
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
              {category.name}
            </h3>

            <p
              className="
                mt-1 line-clamp-2
                text-[11px] leading-4
                text-[#98A2B3]
                dark:text-gray-500
              "
            >
              {category.description || "No description"}
            </p>

            <p className="mt-2 text-[10px] text-[#98A2B3] dark:text-gray-500">
              {category._count.products} products
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;