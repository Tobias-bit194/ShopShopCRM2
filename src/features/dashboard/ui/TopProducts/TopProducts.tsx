import { SearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type TopProduct = {
  id: number;
  name: string;
  sku: string;
  price: string;
};

const products: TopProduct[] = [
  {
    id: 1,
    name: "Apple iPhone 13",
    sku: "#FXZ-4567",
    price: "$999.00",
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    sku: "#FXZ-4582",
    price: "$72.40",
  },
  {
    id: 3,
    name: "T-shirt",
    sku: "#FXZ-4610",
    price: "$35.40",
  },
  {
    id: 4,
    name: "Assorted Cross Bag",
    sku: "#FXZ-4691",
    price: "$80.00",
  },
];

const TopProducts = () => {
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

      {/* Search */}
      <div className="relative mb-5">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />

        <input
          type="text"
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
            focus:ring-2 focus:ring-[#4CAF7A]/10

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-200
          "
        />
      </div>

      {/* Products */}
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="
              flex items-center justify-between gap-3
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
                  rounded-xl
                  bg-[#EAF7F0]
                  text-[#43AE75]
                  dark:bg-emerald-950/40
                  dark:text-emerald-400
                "
              >
                <ShoppingOutlined />
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
              {product.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProducts;