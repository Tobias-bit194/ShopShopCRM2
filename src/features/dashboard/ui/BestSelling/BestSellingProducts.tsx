import { FilterOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type ProductStatus = "Stock" | "Out of stock";

type BestSellingProduct = {
  id: number;
  name: string;
  totalOrders: number;
  status: ProductStatus;
  price: string;
};

const products: BestSellingProduct[] = [
  {
    id: 1,
    name: "Apple iPhone 13",
    totalOrders: 104,
    status: "Stock",
    price: "$999.00",
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    totalOrders: 56,
    status: "Out of stock",
    price: "$72.40",
  },
  {
    id: 3,
    name: "T-shirt",
    totalOrders: 266,
    status: "Stock",
    price: "$35.40",
  },
  {
    id: 4,
    name: "Cross Bag",
    totalOrders: 506,
    status: "Stock",
    price: "$80.00",
  },
];

const statusStyles: Record<ProductStatus, string> = {
  Stock:
    "bg-[#EAF7F0] text-[#3F9F6F] dark:bg-emerald-950/40 dark:text-emerald-400",

  "Out of stock":
    "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400",
};

const BestSellingProducts = () => {
  return (
    <section
      className="
        rounded-2xl border border-[#EAECF0]
        bg-white p-6
        dark:border-gray-800 dark:bg-gray-900
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D2939] dark:text-white">
            Best Selling Products
          </h2>

          <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
            Products with the highest number of orders
          </p>
        </div>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2
            rounded-lg bg-[#4CAF7A]
            px-4 py-2
            text-xs font-semibold text-white
            transition hover:bg-[#3F9F6F]
          "
        >
          <FilterOutlined />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr
              className="
                bg-[#F2F7F4]
                text-xs text-[#667085]
                dark:bg-gray-800 dark:text-gray-400
              "
            >
              <th className="rounded-l-lg px-4 py-3 font-semibold">
                PRODUCT
              </th>

              <th className="px-4 py-3 font-semibold">
                TOTAL ORDERS
              </th>

              <th className="px-4 py-3 font-semibold">
                STATUS
              </th>

              <th className="rounded-r-lg px-4 py-3 font-semibold">
                PRICE
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-b border-[#F2F4F7]
                  transition-colors
                  last:border-none
                  hover:bg-[#FAFBFA]
                  dark:border-gray-800
                  dark:hover:bg-gray-800/50
                "
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-[#EAF7F0]
                        text-[#43AE75]
                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                      "
                    >
                      <ShoppingOutlined />
                    </div>

                    <span className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-xs font-medium text-[#667085] dark:text-gray-400">
                  {product.totalOrders}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      rounded-full px-2.5 py-1
                      text-xs font-semibold
                      ${statusStyles[product.status]}
                    `}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                    {product.status}
                  </span>
                </td>

                <td className="px-4 py-4 text-xs font-bold text-[#1D2939] dark:text-white">
                  {product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end border-t border-[#EAECF0] pt-4 dark:border-gray-800">
        <Link
          to="/products"
          className="
            rounded-full border border-[#4CAF7A]
            px-5 py-2
            text-xs font-semibold text-[#3F9F6F]
            transition
            hover:bg-[#EAF7F0]
            dark:text-emerald-400
            dark:hover:bg-emerald-950/30
          "
        >
          View all
        </Link>
      </div>
    </section>
  );
};

export default BestSellingProducts;