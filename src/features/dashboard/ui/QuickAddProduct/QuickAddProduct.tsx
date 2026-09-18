import {
  AppstoreAddOutlined,
  PlusOutlined,
  RightOutlined,
  ShoppingOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    icon: <AppstoreAddOutlined />,
  },
  {
    name: "Fashion",
    icon: <ShoppingOutlined />,
  },
  {
    name: "Home",
    icon: <TagsOutlined />,
  },
];

const QuickAddProduct = () => {
  return (
    <section
      className="
        h-full rounded-2xl
        border border-[#EAECF0]
        bg-white p-6
        dark:border-gray-800 dark:bg-gray-900
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#1D2939] dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
            Manage your catalog
          </p>
        </div>

        <Link
          to="/products"
          className="
            flex items-center gap-1
            text-xs font-semibold text-[#3F9F6F]
            transition hover:text-[#327F59]
          "
        >
          <PlusOutlined />
          Add New
        </Link>
      </div>

      {/* Main action */}
      <Link
        to="/products"
        className="
          mb-6 flex items-center gap-4
          rounded-2xl
          bg-[#EAF7F0]
          p-4
          transition
          hover:bg-[#DDF2E6]

          dark:bg-emerald-950/30
          dark:hover:bg-emerald-950/50
        "
      >
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            bg-[#4CAF7A]
            text-lg text-white
          "
        >
          <PlusOutlined />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-[#1D2939] dark:text-white">
            Add new product
          </h3>

          <p className="mt-0.5 text-xs text-[#667085] dark:text-gray-400">
            Create a new product in your catalog
          </p>
        </div>

        <RightOutlined className="text-[#3F9F6F]" />
      </Link>

      {/* Categories */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-[#98A2B3]">
            Categories
          </p>

          <Link
            to="/categories"
            className="text-[11px] font-semibold text-[#3F9F6F]"
          >
            View all
          </Link>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/categories"
              className="
                group flex items-center gap-3
                rounded-xl
                border border-[#F0F1F3]
                p-3
                transition
                hover:border-[#DDE7E1]
                hover:bg-[#F8FAF9]

                dark:border-gray-800
                dark:hover:bg-gray-800
              "
            >
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  bg-[#F2F7F4]
                  text-[#43AE75]

                  dark:bg-gray-800
                  dark:text-emerald-400
                "
              >
                {category.icon}
              </div>

              <span className="flex-1 text-xs font-semibold text-[#344054] dark:text-gray-200">
                {category.name}
              </span>

              <RightOutlined
                className="
                  text-[10px] text-[#98A2B3]
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAddProduct;