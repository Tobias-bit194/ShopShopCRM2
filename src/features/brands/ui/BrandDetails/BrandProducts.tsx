import {
  AppstoreOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import type {
  BrandProduct,
} from "../../types/brands.types";

interface BrandProductsProps {
  products: BrandProduct[];
}

const BrandProducts = ({
  products,
}: BrandProductsProps) => {
  if (!products.length) {
    return (
      <div
        className="
          rounded-2xl
          border border-[#EAECF0]
          bg-white
          p-6
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="
                text-lg font-bold
                text-[#101828]

                dark:text-gray-100
              "
            >
              Products
            </h2>

            <p
              className="
                mt-1 text-sm
                text-[#667085]

                dark:text-gray-400
              "
            >
              Products associated with this brand
            </p>
          </div>

          <div
            className="
              rounded-full
              bg-[#F2F4F7]
              px-3 py-1
              text-xs font-semibold
              text-[#475467]

              dark:bg-gray-800
              dark:text-gray-300
            "
          >
            0 products
          </div>
        </div>

        {/* Empty state */}
        <div
          className="
            mt-6
            flex min-h-[240px]
            flex-col
            items-center
            justify-center
            rounded-xl
            border border-dashed
            border-[#D0D5DD]
            bg-[#FCFCFD]
            px-6
            text-center

            dark:border-gray-700
            dark:bg-gray-800/30
          "
        >
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-xl
              bg-[#F2F4F7]
              text-xl
              text-[#667085]

              dark:bg-gray-800
              dark:text-gray-400
            "
          >
            <ShoppingOutlined />
          </div>

          <h3
            className="
              mt-4
              text-sm font-semibold
              text-[#344054]

              dark:text-gray-200
            "
          >
            No products yet
          </h3>

          <p
            className="
              mt-1
              max-w-sm
              text-sm
              text-[#667085]

              dark:text-gray-400
            "
          >
            There are currently no products
            associated with this brand.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border border-[#EAECF0]
        bg-white
        p-6
        shadow-sm

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="
              text-lg font-bold
              text-[#101828]

              dark:text-gray-100
            "
          >
            Products
          </h2>

          <p
            className="
              mt-1 text-sm
              text-[#667085]

              dark:text-gray-400
            "
          >
            Products associated with this brand
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-[#F2F4F7]
            px-3 py-1
            text-xs font-semibold
            text-[#475467]

            dark:bg-gray-800
            dark:text-gray-300
          "
        >
          {products.length}{" "}
          {products.length === 1
            ? "product"
            : "products"}
        </div>
      </div>

      {/* Products */}
      <div
        className="
          mt-6 grid
          grid-cols-1 gap-4

          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: BrandProduct;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {
  return (
    <div
      className="
        group
        rounded-xl
        border border-[#EAECF0]
        bg-white
        p-4
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-md

        dark:border-gray-800
        dark:bg-gray-900
        dark:hover:border-gray-700
      "
    >
      {/* Image */}
      <div
        className="
          flex h-36
          items-center justify-center
          overflow-hidden
          rounded-xl
          bg-[#F9FAFB]

          dark:bg-gray-800/60
        "
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Product"}
            className="
              h-full w-full
              object-contain
              p-3
              transition-transform
              duration-200

              group-hover:scale-[1.03]
            "
          />
        ) : (
          <AppstoreOutlined
            className="
              text-3xl
              text-[#98A2B3]

              dark:text-gray-600
            "
          />
        )}
      </div>

      {/* Product info */}
      <div className="mt-4">
        <div
          className="
            flex items-start
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <h3
              className="
                truncate
                text-sm font-semibold
                text-[#101828]

                dark:text-gray-100
              "
            >
              {product.name ||
                "Unnamed product"}
            </h3>

            {product.slug && (
              <p
                className="
                  mt-1 truncate
                  text-xs
                  text-[#98A2B3]

                  dark:text-gray-500
                "
              >
                {product.slug}
              </p>
            )}
          </div>

          {typeof product.isActive ===
            "boolean" && (
            <span
              className={`
                shrink-0
                rounded-full
                px-2 py-1
                text-[10px]
                font-semibold

                ${
                  product.isActive
                    ? `
                      bg-emerald-50
                      text-emerald-600

                      dark:bg-emerald-950/40
                      dark:text-emerald-400
                    `
                    : `
                      bg-red-50
                      text-red-600

                      dark:bg-red-950/40
                      dark:text-red-400
                    `
                }
              `}
            >
              {product.isActive
                ? "Active"
                : "Inactive"}
            </span>
          )}
        </div>

        {typeof product.price ===
          "number" && (
          <p
            className="
              mt-4
              text-base font-bold
              text-[#101828]

              dark:text-gray-100
            "
          >
            {product.price.toLocaleString()} UZS
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandProducts;