import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { Button } from "antd";

import type { BrandDetails } from "../../types/brands.types";

interface BrandDetailsHeaderProps {
  brand: BrandDetails;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const BrandDetailsHeader = ({
  brand,
  onBack,
  onEdit,
  onDelete,
}: BrandDetailsHeaderProps) => {
  return (
    <div
      className="
        flex flex-col gap-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="
            flex h-10 w-10
            shrink-0 items-center justify-center
            rounded-xl
            border border-[#EAECF0]
            bg-white
            text-[#667085]
            transition

            hover:bg-[#F9FAFB]
            hover:text-[#344054]

            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-400

            dark:hover:bg-gray-800
            dark:hover:text-gray-200
          "
        >
          <ArrowLeftOutlined />
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-[#101828]

                dark:text-gray-100
              "
            >
              {brand.name}
            </h1>

            <span
              className={`
                inline-flex items-center
                gap-1.5
                rounded-full
                px-2.5 py-1
                text-xs font-semibold

                ${
                  brand.isActive
                    ? `
                      bg-[#ECFDF3]
                      text-[#027A48]

                      dark:bg-emerald-950/50
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
              <span
                className={`
                  h-1.5 w-1.5
                  rounded-full

                  ${
                    brand.isActive
                      ? "bg-[#12B76A]"
                      : "bg-red-500"
                  }
                `}
              />

              {brand.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          <p
            className="
              mt-1 text-sm
              text-[#667085]

              dark:text-gray-400
            "
          >
            Brand details and product information
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          icon={<EditOutlined />}
          onClick={onEdit}
          size="large"
          className="
            !h-10
            !rounded-lg
            !border-[#D0D5DD]
            !px-4
            !font-semibold
            !text-[#344054]

            hover:!border-[#98A2B3]
            hover:!text-[#101828]

            dark:!border-gray-700
            dark:!bg-gray-900
            dark:!text-gray-300

            dark:hover:!border-gray-600
            dark:hover:!bg-gray-800
            dark:hover:!text-white
          "
        >
          Edit
        </Button>

        <Button
          icon={<DeleteOutlined />}
          onClick={onDelete}
          size="large"
          danger
          className="
            !h-10
            !rounded-lg
            !px-4
            !font-semibold

            dark:!border-red-900
            dark:!bg-red-950/20
            dark:!text-red-400

            dark:hover:!bg-red-950/40
          "
        >
          Archive
        </Button>
      </div>
    </div>
  );
};

export default BrandDetailsHeader;