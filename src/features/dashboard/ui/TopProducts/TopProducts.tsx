import {
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import type { TopProduct } from "../../types/dashboard.types";

interface TopProductsProps {
  products: TopProduct[];
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US").format(
    value,
  );
};

const TopProducts = ({
  products,
}: TopProductsProps) => {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(query) ||
        product.sku
          .toLowerCase()
          .includes(query),
    );
  }, [products, search]);

  return (
    <section className="h-full rounded-2xl border border-[#EAECF0] bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#1D2939] dark:text-white">
            Top Products
          </h2>

          <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
            Best performing products
          </p>
        </div>

        <Link
          to="/products"
          className="text-xs font-semibold text-[#3F9F6F] transition hover:text-[#327F59]"
        >
          All products
        </Link>
      </div>

      <div className="relative mb-5">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search products"
          className="
            w-full rounded-xl
            border border-[#EAECF0]
            bg-[#F8FAF9]
            py-2.5 pl-9 pr-3
            text-xs text-[#344054]
            outline-none transition
            placeholder:text-[#98A2B3]

            focus:border-[#4CAF7A]
            focus:ring-2
            focus:ring-[#4CAF7A]/10

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-200
          "
        />
      </div>

      <div className="space-y-2">
        {filteredProducts
          .slice(0, 6)
          .map((product) => (
            <div
              key={product.id}
              className="
                flex items-center
                justify-between gap-3
                rounded-xl p-2
                transition-colors
                hover:bg-[#F8FAF9]
                dark:hover:bg-gray-800
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    overflow-hidden
                    rounded-xl
                    bg-[#EAF7F0]
                    text-[#43AE75]

                    dark:bg-emerald-950/40
                    dark:text-emerald-400
                  "
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ShoppingOutlined />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-semibold text-[#344054] dark:text-gray-200">
                    {product.name}
                  </h3>

                  <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                    SKU: {product.sku}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xs font-bold text-[#1D2939] dark:text-white">
                {formatPrice(
                  product.price,
                )}
              </span>
            </div>
          ))}

        {filteredProducts.length === 0 && (
          <div className="py-8 text-center text-xs text-[#98A2B3]">
            No products found
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProducts;