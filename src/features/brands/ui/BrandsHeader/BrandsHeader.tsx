import { MoreVertical, Plus } from "lucide-react";

interface BrandsHeaderProps {
  onAddBrand: () => void;
}

const BrandsHeader = ({
  onAddBrand,
}: BrandsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#173D35] dark:text-white">
          Brands
        </h1>

        <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
          Manage your product brands
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onAddBrand}
          className="
            flex cursor-pointer items-center gap-2
            rounded-xl bg-[#48A375]
            px-4 py-2.5
            text-xs font-semibold text-white
            shadow-sm transition
            hover:bg-[#3D8C64]
          "
        >
          <Plus size={16} />
          Add Brand
        </button>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2
            rounded-xl border border-[#EAECF0]
            bg-white px-4 py-2.5
            text-xs font-semibold text-[#667085]
            transition
            hover:bg-[#F8FAF9]

            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          More Action
          <MoreVertical size={14} />
        </button>
      </div>
    </div>
  );
};

export default BrandsHeader;