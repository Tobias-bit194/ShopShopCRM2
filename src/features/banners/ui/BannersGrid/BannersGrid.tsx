import {
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react";

import type { Banner } from "../../types/banners.types";

interface BannersGridProps {
  banners: Banner[];
  isLoading: boolean;
  error: string | null;
  onEdit: (banner: Banner) => void;
}

type BannerDisplayStatus =
  | "live"
  | "scheduled"
  | "ended"
  | "inactive";

const getBannerStatus = (
  banner: Banner,
): BannerDisplayStatus => {
  if (!banner.isActive) {
    return "inactive";
  }

  const now = new Date();

  if (
    banner.startDate &&
    new Date(banner.startDate) > now
  ) {
    return "scheduled";
  }

  if (
    banner.endDate &&
    new Date(banner.endDate) < now
  ) {
    return "ended";
  }

  return "live";
};

const getStatusConfig = (
  status: BannerDisplayStatus,
) => {
  switch (status) {
    case "live":
      return {
        label: "Live",
        classes: `
          bg-emerald-50
          text-emerald-600
          dark:bg-emerald-950/50
          dark:text-emerald-400
        `,
        dot: "bg-emerald-500",
      };

    case "scheduled":
      return {
        label: "Scheduled",
        classes: `
          bg-blue-50
          text-blue-600
          dark:bg-blue-950/50
          dark:text-blue-400
        `,
        dot: "bg-blue-500",
      };

    case "ended":
      return {
        label: "Ended",
        classes: `
          bg-amber-50
          text-amber-600
          dark:bg-amber-950/50
          dark:text-amber-400
        `,
        dot: "bg-amber-500",
      };

    default:
      return {
        label: "Inactive",
        classes: `
          bg-gray-100
          text-gray-500
          dark:bg-gray-800
          dark:text-gray-400
        `,
        dot: "bg-gray-400",
      };
  }
};

const formatDate = (
  value: string | null,
) => {
  if (!value) return null;

  const date = new Date(value);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getScheduleText = (
  banner: Banner,
) => {
  const start = formatDate(banner.startDate);
  const end = formatDate(banner.endDate);

  if (!start && !end) {
    return "Always";
  }

  if (start && end) {
    return `${start} — ${end}`;
  }

  if (start) {
    return `From ${start}`;
  }

  return `Until ${end}`;
};

const BannersGrid = ({
  banners,
  isLoading,
  error,
  onEdit,
}: BannersGridProps) => {
  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl
          border border-[#EAECF0]
          bg-white p-8
          text-center text-xs
          text-[#98A2B3]

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        Loading banners...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border border-red-200
          bg-red-50 p-8
          text-center text-xs
          text-red-500

          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-400
        "
      >
        {error}
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border border-[#EAECF0]
          bg-white p-8
          text-center text-xs
          text-[#98A2B3]

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        No banners found
      </div>
    );
  }

  return (
    <div
      className="
        grid grid-cols-1
        gap-5
        lg:grid-cols-2
      "
    >
      {banners.slice(0, 4).map((banner) => {
        const status =
          getBannerStatus(banner);

        const statusConfig =
          getStatusConfig(status);

        return (
          <button
            key={banner.id}
            type="button"
            onClick={() => onEdit(banner)}
            className="
              group
              overflow-hidden
              rounded-2xl
              border border-[#EAECF0]
              bg-white
              text-left
              shadow-sm
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:border-[#48A375]
              hover:shadow-md

              dark:border-gray-800
              dark:bg-gray-900
              dark:hover:border-emerald-600
            "
          >
            {/* Banner image */}
            <div
              className="
                relative
                aspect-[16/6]
                w-full
                overflow-hidden
                bg-[#F8FAF9]

                dark:bg-gray-800
              "
            >
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-300

                    group-hover:scale-[1.02]
                  "
                />
              ) : (
                <div
                  className="
                    flex h-full w-full
                    items-center justify-center
                  "
                >
                  <ImageIcon
                    size={30}
                    className="
                      text-[#98A2B3]
                      dark:text-gray-600
                    "
                  />
                </div>
              )}

              {/* Status */}
              <div className="absolute left-3 top-3">
                <span
                  className={`
                    inline-flex
                    items-center gap-1.5
                    rounded-full
                    px-2.5 py-1
                    text-[10px]
                    font-semibold
                    shadow-sm
                    backdrop-blur-sm

                    ${statusConfig.classes}
                  `}
                >
                  <span
                    className={`
                      h-1.5 w-1.5
                      rounded-full

                      ${statusConfig.dot}
                    `}
                  />

                  {statusConfig.label}
                </span>
              </div>

              {/* Sort order */}
              <div
                className="
                  absolute right-3 top-3
                  rounded-lg
                  bg-black/55
                  px-2.5 py-1
                  text-[10px]
                  font-semibold
                  text-white
                  backdrop-blur-sm
                "
              >
                Order #{banner.sortOrder}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div
                className="
                  flex items-start
                  justify-between
                  gap-4
                "
              >
                <div className="min-w-0">
                  <h3
                    className="
                      truncate
                      text-sm font-bold
                      text-[#344054]
                      transition-colors

                      group-hover:text-[#48A375]

                      dark:text-gray-100
                      dark:group-hover:text-emerald-400
                    "
                  >
                    {banner.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-xs leading-5
                      text-[#667085]

                      dark:text-gray-400
                    "
                  >
                    {banner.subtitle ||
                      "No subtitle"}
                  </p>
                </div>

                {banner.buttonText && (
                  <span
                    className="
                      shrink-0
                      rounded-lg
                      bg-[#F2F7F4]
                      px-2.5 py-1.5
                      text-[10px]
                      font-semibold
                      text-[#48A375]

                      dark:bg-emerald-950/40
                      dark:text-emerald-400
                    "
                  >
                    {banner.buttonText}
                  </span>
                )}
              </div>

              {/* Schedule */}
              <div
                className="
                  mt-4
                  flex items-center
                  gap-2
                  border-t
                  border-[#F2F4F7]
                  pt-4

                  dark:border-gray-800
                "
              >
                <CalendarDays
                  size={14}
                  className="
                    shrink-0
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                />

                <span
                  className="
                    truncate
                    text-[11px]
                    font-medium
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  {getScheduleText(banner)}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BannersGrid;