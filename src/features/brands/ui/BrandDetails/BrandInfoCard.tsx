import {
  CalendarOutlined,
  ShoppingOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import type { BrandDetails } from "../../types/brands.types";

interface BrandInfoCardProps {
  brand: BrandDetails;
}

const BrandInfoCard = ({
  brand,
}: BrandInfoCardProps) => {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-[#EAECF0]
        bg-white
        shadow-sm

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Main information */}
      <div
        className="
          grid grid-cols-1
          gap-8 p-6
          lg:grid-cols-[220px_1fr]
        "
      >
        {/* Logo */}
        <div
          className="
            flex min-h-[180px]
            items-center justify-center
            rounded-2xl
            border border-[#EAECF0]
            bg-[#F9FAFB]
            p-6

            dark:border-gray-700
            dark:bg-gray-800/60
          "
        >
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="
                max-h-28
                max-w-full
                object-contain
              "
            />
          ) : (
            <div
              className="
                flex h-20 w-20
                items-center justify-center
                rounded-2xl
                bg-gray-200
                text-2xl font-bold
                text-gray-500

                dark:bg-gray-700
                dark:text-gray-300
              "
            >
              {brand.name
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Information */}
        <div className="min-w-0">
          <div>
            <p
              className="
                text-xs font-semibold
                uppercase tracking-wider
                text-[#98A2B3]

                dark:text-gray-500
              "
            >
              Brand information
            </p>

            <h2
              className="
                mt-2 text-xl
                font-bold text-[#101828]

                dark:text-gray-100
              "
            >
              {brand.name}
            </h2>

            <p
              className="
                mt-2 max-w-2xl
                text-sm leading-6
                text-[#667085]

                dark:text-gray-400
              "
            >
              {brand.description ||
                "No description has been added for this brand yet."}
            </p>
          </div>

          {/* Fields */}
          <div
            className="
              mt-6 grid
              grid-cols-1 gap-4
              sm:grid-cols-2
            "
          >
            <div>
              <p
                className="
                  text-xs font-medium
                  text-[#98A2B3]

                  dark:text-gray-500
                "
              >
                Slug
              </p>

              <div
                className="
                  mt-1.5
                  inline-flex
                  rounded-lg
                  bg-[#F2F4F7]
                  px-2.5 py-1.5
                  font-mono
                  text-xs font-medium
                  text-[#475467]

                  dark:bg-gray-800
                  dark:text-gray-300
                "
              >
                {brand.slug}
              </div>
            </div>

            <div>
              <p
                className="
                  text-xs font-medium
                  text-[#98A2B3]

                  dark:text-gray-500
                "
              >
                Brand ID
              </p>

              <p
                title={brand.id}
                className="
                  mt-1.5
                  max-w-[300px]
                  truncate
                  font-mono
                  text-xs
                  text-[#475467]

                  dark:text-gray-300
                "
              >
                {brand.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="
          grid grid-cols-1
          border-t border-[#EAECF0]

          sm:grid-cols-3

          dark:border-gray-800
        "
      >
        {/* Products */}
        <div
          className="
            flex items-center gap-3
            p-5

            sm:border-r
            sm:border-[#EAECF0]

            dark:sm:border-gray-800
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-blue-50
              text-blue-600

              dark:bg-blue-950/40
              dark:text-blue-400
            "
          >
            <ShoppingOutlined />
          </div>

          <div>
            <p
              className="
                text-xs
                text-[#667085]

                dark:text-gray-400
              "
            >
              Products
            </p>

            <p
              className="
                mt-0.5
                text-lg font-bold
                text-[#101828]

                dark:text-gray-100
              "
            >
              {brand._count?.products ?? 0}
            </p>
          </div>
        </div>

        {/* Created */}
        <div
          className="
            flex items-center gap-3
            border-t border-[#EAECF0]
            p-5

            sm:border-r
            sm:border-t-0
            sm:border-[#EAECF0]

            dark:border-gray-800
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600

              dark:bg-emerald-950/40
              dark:text-emerald-400
            "
          >
            <CalendarOutlined />
          </div>

          <div>
            <p
              className="
                text-xs
                text-[#667085]

                dark:text-gray-400
              "
            >
              Created
            </p>

            <p
              className="
                mt-0.5
                text-sm font-semibold
                text-[#344054]

                dark:text-gray-200
              "
            >
              {formatDate(brand.createdAt)}
            </p>
          </div>
        </div>

        {/* Updated */}
        <div
          className="
            flex items-center gap-3
            border-t border-[#EAECF0]
            p-5

            sm:border-t-0

            dark:border-gray-800
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-violet-50
              text-violet-600

              dark:bg-violet-950/40
              dark:text-violet-400
            "
          >
            <SyncOutlined />
          </div>

          <div>
            <p
              className="
                text-xs
                text-[#667085]

                dark:text-gray-400
              "
            >
              Last updated
            </p>

            <p
              className="
                mt-0.5
                text-sm font-semibold
                text-[#344054]

                dark:text-gray-200
              "
            >
              {formatDate(brand.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInfoCard;