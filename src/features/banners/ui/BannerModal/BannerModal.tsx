import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";

import {
  createBanner,
  updateBanner,
} from "../../services/banners.service";

import type {
  Banner,
  BannerPayload,
} from "../../types/banners.types";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  banner?: Banner | null;
  onSuccess?: () => void | Promise<void>;
}

const BannerModal = ({
  isOpen,
  onClose,
  mode = "create",
  banner = null,
  onSuccess,
}: BannerModalProps) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const [image, setImage] = useState("");
  const [mobileImage, setMobileImage] =
    useState("");

  const [buttonText, setButtonText] =
    useState("");

  const [link, setLink] = useState("");

  const [sortOrder, setSortOrder] =
    useState<number>(0);

  const [isActive, setIsActive] =
    useState(true);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  // =========================
  // DATE FORMAT
  // =========================

  const toDateTimeLocal = (
    value: string | null | undefined,
  ) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const offset =
      date.getTimezoneOffset() * 60_000;

    return new Date(
      date.getTime() - offset,
    )
      .toISOString()
      .slice(0, 16);
  };

  // =========================
  // FILL FORM
  // =========================

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && banner) {
      setTitle(banner.title ?? "");
      setSubtitle(banner.subtitle ?? "");

      setImage(banner.image ?? "");
      setMobileImage(
        banner.mobileImage ?? "",
      );

      setButtonText(
        banner.buttonText ?? "",
      );

      setLink(banner.link ?? "");

      setSortOrder(
        banner.sortOrder ?? 0,
      );

      setIsActive(
        banner.isActive ?? true,
      );

      setStartDate(
        toDateTimeLocal(
          banner.startDate,
        ),
      );

      setEndDate(
        toDateTimeLocal(
          banner.endDate,
        ),
      );
    } else {
      setTitle("");
      setSubtitle("");

      setImage("");
      setMobileImage("");

      setButtonText("");
      setLink("");

      setSortOrder(0);
      setIsActive(true);

      setStartDate("");
      setEndDate("");
    }

    setError("");
  }, [isOpen, mode, banner]);

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    if (isSubmitting) return;

    onClose();
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(
        "Banner title is required.",
      );
      return;
    }

    if (!image.trim()) {
      setError(
        "Desktop image is required.",
      );
      return;
    }

    if (
      startDate &&
      endDate &&
      new Date(startDate) >
        new Date(endDate)
    ) {
      setError(
        "End date must be after start date.",
      );
      return;
    }

    const payload: BannerPayload = {
      title: title.trim(),
      subtitle: subtitle.trim(),

      image: image.trim(),
      mobileImage:
        mobileImage.trim(),

      buttonText:
        buttonText.trim(),

      link: link.trim(),

      sortOrder,
      isActive,

      startDate: startDate
        ? new Date(
            startDate,
          ).toISOString()
        : null,

      endDate: endDate
        ? new Date(
            endDate,
          ).toISOString()
        : null,
    };

    try {
      setIsSubmitting(true);
      setError("");

      if (mode === "edit") {
        if (!banner) {
          setError(
            "Banner not found.",
          );
          return;
        }

        await updateBanner(
          banner.id,
          payload,
        );
      } else {
        await createBanner(
          payload,
        );
      }

      await onSuccess?.();

      onClose();
    } catch (error: any) {
      console.error(
        "Failed to save banner:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to save banner. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center
        justify-center
        bg-black/40 p-4
        backdrop-blur-[2px]
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          flex max-h-[92vh]
          w-full max-w-[760px]
          flex-col
          overflow-hidden
          rounded-2xl
          border border-[#EAECF0]
          bg-white
          shadow-2xl

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        {/* ===================== */}
        {/* HEADER */}
        {/* ===================== */}

        <div
          className="
            flex shrink-0
            items-center
            justify-between
            border-b
            border-[#EAECF0]
            px-6 py-5

            dark:border-gray-800
          "
        >
          <div>
            <h2
              className="
                text-base font-bold
                text-[#344054]

                dark:text-gray-100
              "
            >
              {mode === "create"
                ? "Add Banner"
                : "Edit Banner"}
            </h2>

            <p
              className="
                mt-1 text-xs
                text-[#98A2B3]

                dark:text-gray-500
              "
            >
              {mode === "create"
                ? "Create a new promotional banner."
                : "Update banner information."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              flex h-9 w-9
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              text-[#98A2B3]
              transition

              hover:bg-[#F2F4F7]
              hover:text-[#344054]

              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:hover:bg-gray-800
              dark:hover:text-gray-200
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ===================== */}
        {/* BODY */}
        {/* ===================== */}

        <div
          className="
            flex-1
            space-y-6
            overflow-y-auto
            p-6
          "
        >
          {/* Error */}

          {error && (
            <div
              className="
                rounded-xl
                border border-red-200
                bg-red-50
                px-4 py-3
                text-xs font-medium
                text-red-600

                dark:border-red-900
                dark:bg-red-950/30
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* ===================== */}
          {/* DESKTOP IMAGE */}
          {/* ===================== */}

          <div className="space-y-2">
            <div
              className="
                flex items-center gap-2
              "
            >
              <Monitor
                size={15}
                className="
                  text-[#48A375]
                "
              />

              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Desktop Banner
              </label>
            </div>

            <div
              className="
                overflow-hidden
                rounded-xl
                border border-[#EAECF0]
                bg-[#F8FAF9]

                dark:border-gray-700
                dark:bg-gray-800
              "
            >
              {/* Preview */}

              <div
                className="
                  flex h-44
                  items-center
                  justify-center
                  overflow-hidden

                  dark:bg-gray-950/30
                "
              >
                {image ? (
                  <img
                    src={image}
                    alt="Desktop preview"
                    className="
                      h-full w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex flex-col
                      items-center gap-2
                      text-[#98A2B3]

                      dark:text-gray-500
                    "
                  >
                    <ImageIcon
                      size={26}
                    />

                    <span className="text-[11px]">
                      Desktop preview
                    </span>
                  </div>
                )}
              </div>

              {/* URL */}

              <div className="p-3">
                <input
                  type="url"
                  value={image}
                  onChange={(e) =>
                    setImage(
                      e.target.value,
                    )
                  }
                  placeholder="https://example.com/banner.jpg"
                  className="
                    w-full
                    rounded-lg
                    border border-[#EAECF0]
                    bg-white
                    px-3.5 py-2.5
                    text-xs
                    text-[#344054]
                    outline-none
                    transition

                    placeholder:text-[#98A2B3]

                    focus:border-[#48A375]
                    focus:ring-2
                    focus:ring-[#48A375]/10

                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-100
                  "
                />
              </div>
            </div>
          </div>

          {/* ===================== */}
          {/* MOBILE IMAGE */}
          {/* ===================== */}

          <div className="space-y-2">
            <div
              className="
                flex items-center gap-2
              "
            >
              <Smartphone
                size={15}
                className="
                  text-[#48A375]
                "
              />

              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Mobile Banner
              </label>
            </div>

            <div
              className="
                flex flex-col
                gap-4
                rounded-xl
                border border-[#EAECF0]
                bg-[#F8FAF9]
                p-4

                sm:flex-row
                sm:items-center

                dark:border-gray-700
                dark:bg-gray-800
              "
            >
              {/* Preview */}

              <div
                className="
                  flex h-32 w-full
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border border-[#EAECF0]
                  bg-white

                  sm:w-28

                  dark:border-gray-700
                  dark:bg-gray-900
                "
              >
                {mobileImage ? (
                  <img
                    src={mobileImage}
                    alt="Mobile preview"
                    className="
                      h-full w-full
                      object-cover
                    "
                  />
                ) : (
                  <Smartphone
                    size={25}
                    className="
                      text-[#98A2B3]

                      dark:text-gray-500
                    "
                  />
                )}
              </div>

              <div className="flex-1">
                <p
                  className="
                    text-xs font-semibold
                    text-[#344054]

                    dark:text-gray-200
                  "
                >
                  Mobile Image URL
                </p>

                <p
                  className="
                    mt-1 text-[10px]
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  Image used on mobile
                  devices.
                </p>

                <input
                  type="url"
                  value={mobileImage}
                  onChange={(e) =>
                    setMobileImage(
                      e.target.value,
                    )
                  }
                  placeholder="https://example.com/mobile.jpg"
                  className="
                    mt-3 w-full
                    rounded-lg
                    border border-[#EAECF0]
                    bg-white
                    px-3.5 py-2.5
                    text-xs
                    text-[#344054]
                    outline-none
                    transition

                    placeholder:text-[#98A2B3]

                    focus:border-[#48A375]
                    focus:ring-2
                    focus:ring-[#48A375]/10

                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-100
                  "
                />
              </div>
            </div>
          </div>

          {/* ===================== */}
          {/* TITLE + SUBTITLE */}
          {/* ===================== */}

          <div
            className="
              grid grid-cols-1
              gap-4

              sm:grid-cols-2
            "
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value,
                  )
                }
                placeholder="Summer Sale"
                required
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-[#344054]
                  outline-none
                  transition

                  placeholder:font-normal
                  placeholder:text-[#98A2B3]

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100

                  dark:focus:bg-gray-800
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Subtitle
              </label>

              <input
                type="text"
                value={subtitle}
                onChange={(e) =>
                  setSubtitle(
                    e.target.value,
                  )
                }
                placeholder="Up to 50% discount"
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs
                  text-[#344054]
                  outline-none
                  transition

                  placeholder:text-[#98A2B3]

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100

                  dark:focus:bg-gray-800
                "
              />
            </div>
          </div>

          {/* ===================== */}
          {/* BUTTON + LINK */}
          {/* ===================== */}

          <div
            className="
              grid grid-cols-1
              gap-4

              sm:grid-cols-2
            "
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Button Text
              </label>

              <input
                type="text"
                value={buttonText}
                onChange={(e) =>
                  setButtonText(
                    e.target.value,
                  )
                }
                placeholder="Shop Now"
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs
                  text-[#344054]
                  outline-none
                  transition

                  placeholder:text-[#98A2B3]

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100

                  dark:focus:bg-gray-800
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Link
              </label>

              <input
                type="text"
                value={link}
                onChange={(e) =>
                  setLink(
                    e.target.value,
                  )
                }
                placeholder="/products"
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs
                  text-[#344054]
                  outline-none
                  transition

                  placeholder:text-[#98A2B3]

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100

                  dark:focus:bg-gray-800
                "
              />
            </div>
          </div>

          {/* ===================== */}
          {/* SORT ORDER */}
          {/* ===================== */}

          <div className="flex flex-col gap-1.5">
            <label
              className="
                text-xs font-semibold
                text-[#667085]

                dark:text-gray-400
              "
            >
              Sort Order
            </label>

            <input
              type="number"
              value={sortOrder}
              min={0}
              onChange={(e) =>
                setSortOrder(
                  Number(
                    e.target.value,
                  ),
                )
              }
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5
                text-xs
                text-[#344054]
                outline-none
                transition

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100

                dark:focus:bg-gray-800
              "
            />

            <p
              className="
                text-[10px]
                text-[#98A2B3]

                dark:text-gray-500
              "
            >
              Lower values appear first.
            </p>
          </div>

          {/* ===================== */}
          {/* DATES */}
          {/* ===================== */}

          <div
            className="
              grid grid-cols-1
              gap-4

              sm:grid-cols-2
            "
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                Start Date
              </label>

              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value,
                  )
                }
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs
                  text-[#344054]
                  outline-none
                  transition

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100
                  dark:[color-scheme:dark]

                  dark:focus:bg-gray-800
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="
                  text-xs font-semibold
                  text-[#667085]

                  dark:text-gray-400
                "
              >
                End Date
              </label>

              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value,
                  )
                }
                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs
                  text-[#344054]
                  outline-none
                  transition

                  focus:border-[#48A375]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100
                  dark:[color-scheme:dark]

                  dark:focus:bg-gray-800
                "
              />
            </div>
          </div>

          {/* ===================== */}
          {/* ACTIVE */}
          {/* ===================== */}

          <label
            className="
              flex cursor-pointer
              items-center
              justify-between
              rounded-xl
              border border-[#EAECF0]
              p-4

              dark:border-gray-700
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold
                  text-[#344054]

                  dark:text-gray-200
                "
              >
                Active Banner
              </p>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-[#98A2B3]

                  dark:text-gray-500
                "
              >
                Banner can be displayed
                when its schedule is
                active.
              </p>
            </div>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(
                  e.target.checked,
                )
              }
              className="
                h-4 w-4
                cursor-pointer
                accent-[#48A375]
              "
            />
          </label>
        </div>

        {/* ===================== */}
        {/* FOOTER */}
        {/* ===================== */}

        <div
          className="
            flex shrink-0
            justify-end gap-3
            border-t
            border-[#EAECF0]
            bg-white
            px-6 py-4

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              cursor-pointer
              rounded-lg
              border border-[#EAECF0]
              bg-white
              px-5 py-2.5
              text-xs font-semibold
              text-[#667085]
              transition

              hover:bg-[#F8FAF9]

              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:border-gray-700
              dark:bg-gray-900
              dark:text-gray-300

              dark:hover:bg-gray-800
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              cursor-pointer
              rounded-lg
              bg-[#48A375]
              px-5 py-2.5
              text-xs font-semibold
              text-white
              transition

              hover:bg-[#3D8C64]

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Banner"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerModal;