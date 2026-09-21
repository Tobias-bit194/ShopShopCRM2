import { Plus } from "lucide-react";

interface BannersHeaderProps {
  onAddBanner: () => void;
}

const BannersHeader = ({
  onAddBanner,
}: BannersHeaderProps) => {
  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Title */}
      <div>
        <h1
          className="
            text-2xl font-bold
            tracking-tight
            text-[#101828]

            dark:text-gray-100
          "
        >
          Banners
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-[#667085]

            dark:text-gray-400
          "
        >
          Manage promotional banners and campaigns
        </p>
      </div>

      {/* Add Banner */}
      <button
        type="button"
        onClick={onAddBanner}
        className="
          flex cursor-pointer
          items-center justify-center
          gap-2
          rounded-xl
          bg-[#48A375]
          px-4 py-2.5
          text-xs font-semibold
          text-white
          shadow-sm
          transition-all duration-200

          hover:bg-[#3D8C64]
          hover:shadow-md

          active:scale-[0.98]

          dark:bg-emerald-600
          dark:hover:bg-emerald-700
        "
      >
        <Plus size={16} />

        Add Banner
      </button>
    </div>
  );
};

export default BannersHeader;