import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  createProduct,
  updateProduct,
} from "../../services/products.service";

import type {
  Product,
  ProductPayload,
  ProductPayloadVariant,
} from "../../types/products.types";

interface DriverCategory {
  id: string;
  name: string;
}

interface DriverBrand {
  id: string;
  name: string;
}

interface ProductDriverProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  product?: Product | null;

  categories?: DriverCategory[];
  brands?: DriverBrand[];

  isCategoriesLoading?: boolean;
  isBrandsLoading?: boolean;

  onSuccess?: () => void | Promise<void>;
}

const createEmptyVariant = (): ProductPayloadVariant => ({
  sku: "",
  price: 0,
  stock: 0,
  attributes: {
    storage: "",
    ram: "",
  },
  isActive: true,
});

const ProductDriver = ({
  isOpen,
  onClose,
  mode = "create",
  product = null,
  categories = [],
  brands = [],
  isCategoriesLoading = false,
  isBrandsLoading = false,
  onSuccess,
}: ProductDriverProps) => {
  /* =========================
     DRIVER ANIMATION
  ========================= */

  const [shouldRender, setShouldRender] =
    useState(isOpen);

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);

    const timeout = window.setTimeout(() => {
      setShouldRender(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  /* =========================
     LOCK BODY SCROLL
  ========================= */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  /* =========================
     BASIC INFORMATION
  ========================= */

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [description, setDescription] =
    useState("");

  const [
    shortDescription,
    setShortDescription,
  ] = useState("");

  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");

  /* =========================
     PRICE / STOCK
  ========================= */

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] =
    useState("");

  const [
    discountPercent,
    setDiscountPercent,
  ] = useState("0");

  const [stock, setStock] = useState("");

  const [
    lowStockThreshold,
    setLowStockThreshold,
  ] = useState("5");

  /* =========================
     RELATIONS
  ========================= */

  const [categoryId, setCategoryId] =
    useState("");

  const [brandId, setBrandId] =
    useState("");

  /* =========================
     IMAGE
  ========================= */

  const [imageUrl, setImageUrl] =
    useState("");

  const [imageAlt, setImageAlt] =
    useState("");

  /* =========================
     SETTINGS
  ========================= */

  const [isActive, setIsActive] =
    useState(true);

  const [isFeatured, setIsFeatured] =
    useState(false);

  const [isNew, setIsNew] =
    useState(true);

  const [isPopular, setIsPopular] =
    useState(false);

  /* =========================
     VARIANTS
  ========================= */

  const [variants, setVariants] = useState<
    ProductPayloadVariant[]
  >([]);

  /* =========================
     REQUEST STATE
  ========================= */

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  /* =========================
     FILL / RESET FORM
  ========================= */

  useEffect(() => {
    if (!isOpen) return;

    setError(null);

    if (mode === "edit" && product) {
      setName(product.name ?? "");
      setSlug(product.slug ?? "");

      setDescription(
        product.description ?? "",
      );

      setShortDescription(
        product.shortDescription ?? "",
      );

      setSku(product.sku ?? "");
      setBarcode(product.barcode ?? "");

      setPrice(
        String(product.price ?? 0),
      );

      setOldPrice(
        product.oldPrice !== null &&
          product.oldPrice !== undefined
          ? String(product.oldPrice)
          : "",
      );

      setDiscountPercent(
        String(
          product.discountPercent ?? 0,
        ),
      );

      setStock(
        String(product.stock ?? 0),
      );

      setLowStockThreshold(
        String(
          product.lowStockThreshold ?? 5,
        ),
      );

      setCategoryId(
        product.categoryId ?? "",
      );

      setBrandId(
        product.brandId ?? "",
      );

      const mainImage =
        product.images?.find(
          (image) => image.isMain,
        ) ?? product.images?.[0];

      setImageUrl(
        mainImage?.url ?? "",
      );

      setImageAlt(
        mainImage?.alt ??
          product.name ??
          "",
      );

      setIsActive(
        product.isActive ?? true,
      );

      setIsFeatured(
        product.isFeatured ?? false,
      );

      setIsNew(
        product.isNew ?? false,
      );

      setIsPopular(
        product.isPopular ?? false,
      );

      const mappedVariants =
        product.variants?.map(
          (variant) => ({
            sku: variant.sku ?? "",
            price: variant.price ?? 0,
            stock: variant.stock ?? 0,

            attributes: {
              ...variant.attributes,
            },

            isActive:
              variant.isActive ?? true,
          }),
        ) ?? [];

      setVariants(mappedVariants);

      return;
    }

    setName("");
    setSlug("");

    setDescription("");
    setShortDescription("");

    setSku("");
    setBarcode("");

    setPrice("");
    setOldPrice("");

    setDiscountPercent("0");

    setStock("");
    setLowStockThreshold("5");

    setCategoryId("");
    setBrandId("");

    setImageUrl("");
    setImageAlt("");

    setIsActive(true);
    setIsFeatured(false);
    setIsNew(true);
    setIsPopular(false);

    setVariants([]);
  }, [isOpen, mode, product]);

  /* =========================
     AUTO SLUG
  ========================= */

  const handleNameChange = (
    value: string,
  ) => {
    setName(value);

    if (mode === "create") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(
          /[^a-z0-9а-яё]+/gi,
          "-",
        )
        .replace(/^-+|-+$/g, "");

      setSlug(generatedSlug);
    }

    if (!imageAlt.trim()) {
      setImageAlt(value);
    }
  };

  /* =========================
     VARIANTS
  ========================= */

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      createEmptyVariant(),
    ]);
  };

  const handleRemoveVariant = (
    index: number,
  ) => {
    setVariants((prev) =>
      prev.filter(
        (_, variantIndex) =>
          variantIndex !== index,
      ),
    );
  };

  const updateVariant = (
    index: number,
    field:
      | "sku"
      | "price"
      | "stock"
      | "isActive",
    value: string | number | boolean,
  ) => {
    setVariants((prev) =>
      prev.map(
        (variant, variantIndex) => {
          if (variantIndex !== index) {
            return variant;
          }

          return {
            ...variant,
            [field]: value,
          };
        },
      ),
    );
  };

  const updateVariantAttribute = (
    index: number,
    attribute: string,
    value: string,
  ) => {
    setVariants((prev) =>
      prev.map(
        (variant, variantIndex) => {
          if (variantIndex !== index) {
            return variant;
          }

          return {
            ...variant,

            attributes: {
              ...variant.attributes,
              [attribute]: value,
            },
          };
        },
      ),
    );
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!name.trim()) {
      setError(
        "Product name is required.",
      );
      return;
    }

    if (!slug.trim()) {
      setError("Slug is required.");
      return;
    }

    if (!sku.trim()) {
      setError("SKU is required.");
      return;
    }

    if (!categoryId) {
      setError(
        "Please select a category.",
      );
      return;
    }

    if (!brandId) {
      setError(
        "Please select a brand.",
      );
      return;
    }

    if (!price.trim()) {
      setError("Price is required.");
      return;
    }

    if (!stock.trim()) {
      setError("Stock is required.");
      return;
    }

    const parsedPrice =
      Number(price);

    const parsedOldPrice =
      oldPrice.trim()
        ? Number(oldPrice)
        : 0;

    const parsedDiscount =
      Number(discountPercent);

    const parsedStock =
      Number(stock);

    const parsedLowStockThreshold =
      Number(lowStockThreshold);

    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setError(
        "Price must be a valid number.",
      );
      return;
    }

    if (
      !Number.isFinite(
        parsedOldPrice,
      ) ||
      parsedOldPrice < 0
    ) {
      setError(
        "Old price must be a valid number.",
      );
      return;
    }

    if (
      !Number.isFinite(
        parsedDiscount,
      ) ||
      parsedDiscount < 0 ||
      parsedDiscount > 100
    ) {
      setError(
        "Discount must be between 0 and 100.",
      );
      return;
    }

    if (
      !Number.isFinite(parsedStock) ||
      parsedStock < 0
    ) {
      setError(
        "Stock must be a valid number.",
      );
      return;
    }

    if (
      !Number.isFinite(
        parsedLowStockThreshold,
      ) ||
      parsedLowStockThreshold < 0
    ) {
      setError(
        "Low stock threshold must be a valid number.",
      );
      return;
    }

    const preparedVariants =
      variants.map((variant) => ({
        sku: variant.sku.trim(),

        price:
          Number(variant.price) || 0,

        stock:
          Number(variant.stock) || 0,

        attributes:
          Object.fromEntries(
            Object.entries(
              variant.attributes,
            ).filter(
              ([, value]) =>
                String(value).trim() !==
                "",
            ),
          ),

        isActive:
          variant.isActive,
      }));

    const invalidVariant =
      preparedVariants.some(
        (variant) => !variant.sku,
      );

    if (invalidVariant) {
      setError(
        "Each variant must have a SKU.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: ProductPayload = {
        name: name.trim(),
        slug: slug.trim(),

        description:
          description.trim(),

        shortDescription:
          shortDescription.trim(),

        sku: sku.trim(),

        barcode:
          barcode.trim(),

        price: parsedPrice,

        oldPrice:
          parsedOldPrice,

        discountPercent:
          parsedDiscount,

        stock:
          parsedStock,

        lowStockThreshold:
          parsedLowStockThreshold,

        brandId,
        categoryId,

        isActive,
        isFeatured,
        isNew,
        isPopular,

        images: imageUrl.trim()
          ? [
              {
                url:
                  imageUrl.trim(),

                alt:
                  imageAlt.trim() ||
                  name.trim(),

                isMain: true,

                sortOrder: 0,
              },
            ]
          : [],

        variants:
          preparedVariants,
      };

      if (
        mode === "edit" &&
        product
      ) {
        await updateProduct(
          product.id,
          payload,
        );
      } else {
        await createProduct(
          payload,
        );
      }

      await onSuccess?.();

      onClose();
    } catch (error: unknown) {
      console.error(
        "Failed to save product:",
        error,
      );

      let message =
        "Failed to save product.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError =
          error as {
            response?: {
              data?: {
                message?:
                  | string
                  | string[];
              };
            };
          };

        const responseMessage =
          axiosError.response?.data
            ?.message;

        if (
          Array.isArray(
            responseMessage,
          )
        ) {
          message =
            responseMessage.join(
              ", ",
            );
        } else if (
          typeof responseMessage ===
          "string"
        ) {
          message =
            responseMessage;
        }
      }

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     RENDER CHECK
  ========================= */

  if (!shouldRender) {
    return null;
  }

  /* =========================
     CLASSES
  ========================= */

  const inputClass = `
    w-full rounded-lg
    border border-[#EAECF0]
    bg-[#F8FAF9]
    px-3.5 py-2.5
    text-xs text-[#344054]
    outline-none transition

    placeholder:text-[#98A2B3]

    focus:border-[#48A375]
    focus:bg-white
    focus:ring-2
    focus:ring-[#48A375]/10

    disabled:cursor-not-allowed
    disabled:opacity-60

    dark:border-gray-700
    dark:bg-gray-800
    dark:text-gray-100
    dark:placeholder:text-gray-500
    dark:focus:bg-gray-800
  `;

  const labelClass =
    "text-xs font-semibold text-[#667085] dark:text-gray-400";

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close product driver"
        onClick={onClose}
        disabled={isSubmitting}
        className={`
          absolute inset-0
          cursor-default
          bg-black/40
          backdrop-blur-[2px]

          transition-opacity
          duration-300
          ease-out

          ${
            isVisible
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />

      {/* Driver */}
      <div
        className={`
          absolute right-0 top-0
          flex h-full
          w-full max-w-[680px]
          flex-col
          border-l border-[#EAECF0]
          bg-white
          shadow-2xl

          transform-gpu
          transition-transform
          duration-300
          ease-out

          dark:border-gray-800
          dark:bg-gray-900

          ${
            isVisible
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div
          className="
            flex shrink-0
            items-center justify-between
            border-b border-[#EAECF0]
            px-6 py-5

            dark:border-gray-800
          "
        >
          <div>
            <h2 className="text-lg font-bold text-[#344054] dark:text-gray-100">
              {mode === "create"
                ? "Add Product"
                : "Edit Product"}
            </h2>

            <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
              {mode === "create"
                ? "Create a new product for your store."
                : "Update product information."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="
              flex h-9 w-9
              cursor-pointer
              items-center justify-center
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            flex min-h-0 flex-1
            flex-col
          "
        >
          {/* Scroll Content */}
          <div
            className="
              flex-1 space-y-7
              overflow-y-auto
              overscroll-contain
              p-6

              [scrollbar-width:thin]
              [scrollbar-color:#D0D5DD_transparent]

              dark:[scrollbar-color:#4B5563_transparent]
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
                  text-xs text-red-600

                  dark:border-red-900
                  dark:bg-red-950/30
                  dark:text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* Basic Information */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                  Basic Information
                </h3>

                <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                  General information about the
                  product.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Product Name *
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      handleNameChange(
                        event.target
                          .value,
                      )
                    }
                    placeholder="iPhone 15 Pro"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Slug *
                  </label>

                  <input
                    type="text"
                    value={slug}
                    onChange={(event) =>
                      setSlug(
                        event.target
                          .value,
                      )
                    }
                    placeholder="iphone-15-pro"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className={
                    labelClass
                  }
                >
                  Short Description
                </label>

                <input
                  type="text"
                  value={
                    shortDescription
                  }
                  onChange={(event) =>
                    setShortDescription(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Short product description"
                  className={
                    inputClass
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className={
                    labelClass
                  }
                >
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Detailed product description..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    SKU *
                  </label>

                  <input
                    type="text"
                    value={sku}
                    onChange={(event) =>
                      setSku(
                        event.target
                          .value,
                      )
                    }
                    placeholder="IPH15P-256"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Barcode
                  </label>

                  <input
                    type="text"
                    value={barcode}
                    onChange={(event) =>
                      setBarcode(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Barcode"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-[#EAECF0] dark:border-gray-800" />

            {/* Category / Brand */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                  Category & Brand
                </h3>

                <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                  Assign the product to its
                  category and brand.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Category *
                  </label>

                  <select
                    value={
                      categoryId
                    }
                    onChange={(event) =>
                      setCategoryId(
                        event.target
                          .value,
                      )
                    }
                    required
                    disabled={
                      isCategoriesLoading
                    }
                    className={
                      inputClass
                    }
                  >
                    <option value="">
                      {isCategoriesLoading
                        ? "Loading categories..."
                        : categories.length ===
                            0
                          ? "No categories available"
                          : "Select category"}
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Brand *
                  </label>

                  <select
                    value={brandId}
                    onChange={(event) =>
                      setBrandId(
                        event.target
                          .value,
                      )
                    }
                    required
                    disabled={
                      isBrandsLoading
                    }
                    className={
                      inputClass
                    }
                  >
                    <option value="">
                      {isBrandsLoading
                        ? "Loading brands..."
                        : brands.length ===
                            0
                          ? "No brands available"
                          : "Select brand"}
                    </option>

                    {brands.map(
                      (brand) => (
                        <option
                          key={
                            brand.id
                          }
                          value={
                            brand.id
                          }
                        >
                          {brand.name}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </section>

            <div className="border-t border-[#EAECF0] dark:border-gray-800" />

            {/* Pricing & Stock */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                  Pricing & Stock
                </h3>

                <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                  Configure price and
                  inventory.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Price *
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={price}
                    onChange={(event) =>
                      setPrice(
                        event.target
                          .value,
                      )
                    }
                    placeholder="14999000"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Old Price
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={oldPrice}
                    onChange={(event) =>
                      setOldPrice(
                        event.target
                          .value,
                      )
                    }
                    placeholder="0"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Discount %
                  </label>

                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={
                      discountPercent
                    }
                    onChange={(event) =>
                      setDiscountPercent(
                        event.target
                          .value,
                      )
                    }
                    placeholder="0"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Stock *
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(event) =>
                      setStock(
                        event.target
                          .value,
                      )
                    }
                    placeholder="10"
                    required
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={
                      labelClass
                    }
                  >
                    Low Stock Threshold
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={
                      lowStockThreshold
                    }
                    onChange={(event) =>
                      setLowStockThreshold(
                        event.target
                          .value,
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-[#EAECF0] dark:border-gray-800" />

            {/* Product Image */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                  Product Image
                </h3>

                <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                  Add the main product image.
                </p>
              </div>

              <div
                className="
                  flex items-center gap-4
                  rounded-xl
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  p-4

                  dark:border-gray-700
                  dark:bg-gray-800
                "
              >
                <div
                  className="
                    flex h-20 w-20 shrink-0
                    items-center justify-center
                    overflow-hidden rounded-xl
                    border border-[#EAECF0]
                    bg-white

                    dark:border-gray-700
                    dark:bg-gray-900
                  "
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={
                        imageAlt ||
                        name ||
                        "Product"
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={24}
                      className="text-[#98A2B3] dark:text-gray-500"
                    />
                  )}
                </div>

                <div className="grid flex-1 grid-cols-1 gap-3">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(event) =>
                      setImageUrl(
                        event.target
                          .value,
                      )
                    }
                    placeholder="https://example.com/product.jpg"
                    className={
                      inputClass
                    }
                  />

                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(event) =>
                      setImageAlt(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Image alt text"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </section>

            <div className="border-t border-[#EAECF0] dark:border-gray-800" />

            {/* Variants */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                    Variants
                  </h3>

                  <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                    Optional storage and RAM
                    variants.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleAddVariant
                  }
                  className="
                    flex cursor-pointer
                    items-center gap-1.5
                    rounded-lg
                    border border-[#EAECF0]
                    px-3 py-2
                    text-[11px] font-semibold
                    text-[#667085]
                    transition

                    hover:border-[#48A375]
                    hover:text-[#48A375]

                    dark:border-gray-700
                    dark:text-gray-300
                  "
                >
                  <Plus size={13} />
                  Add Variant
                </button>
              </div>

              {variants.length === 0 ? (
                <div
                  className="
                    rounded-xl
                    border border-dashed
                    border-[#D0D5DD]
                    px-4 py-6
                    text-center
                    text-xs text-[#98A2B3]

                    dark:border-gray-700
                    dark:text-gray-500
                  "
                >
                  No product variants
                </div>
              ) : (
                <div className="space-y-3">
                  {variants.map(
                    (
                      variant,
                      index,
                    ) => (
                      <div
                        key={index}
                        className="
                          space-y-3
                          rounded-xl
                          border border-[#EAECF0]
                          p-4

                          dark:border-gray-700
                        "
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                            Variant{" "}
                            {index + 1}
                          </p>

                          <button
                            type="button"
                            title="Remove variant"
                            onClick={() =>
                              handleRemoveVariant(
                                index,
                              )
                            }
                            className="
                              cursor-pointer
                              rounded-lg p-1.5
                              text-[#98A2B3]
                              transition

                              hover:bg-red-50
                              hover:text-red-500

                              dark:hover:bg-red-950/30
                              dark:hover:text-red-400
                            "
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          <input
                            type="text"
                            value={
                              variant.sku
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariant(
                                index,
                                "sku",
                                event
                                  .target
                                  .value,
                              )
                            }
                            placeholder="Variant SKU"
                            className={
                              inputClass
                            }
                          />

                          <input
                            type="number"
                            min={0}
                            value={
                              variant.price
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariant(
                                index,
                                "price",
                                Number(
                                  event
                                    .target
                                    .value,
                                ),
                              )
                            }
                            placeholder="Price"
                            className={
                              inputClass
                            }
                          />

                          <input
                            type="number"
                            min={0}
                            value={
                              variant.stock
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariant(
                                index,
                                "stock",
                                Number(
                                  event
                                    .target
                                    .value,
                                ),
                              )
                            }
                            placeholder="Stock"
                            className={
                              inputClass
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <input
                            type="text"
                            value={
                              variant
                                .attributes
                                .storage ??
                              ""
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariantAttribute(
                                index,
                                "storage",
                                event
                                  .target
                                  .value,
                              )
                            }
                            placeholder="Storage — 256GB"
                            className={
                              inputClass
                            }
                          />

                          <input
                            type="text"
                            value={
                              variant
                                .attributes
                                .ram ?? ""
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariantAttribute(
                                index,
                                "ram",
                                event
                                  .target
                                  .value,
                              )
                            }
                            placeholder="RAM — 8GB"
                            className={
                              inputClass
                            }
                          />
                        </div>

                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              variant.isActive
                            }
                            onChange={(
                              event,
                            ) =>
                              updateVariant(
                                index,
                                "isActive",
                                event
                                  .target
                                  .checked,
                              )
                            }
                            className="accent-[#48A375]"
                          />

                          <span className="text-[11px] font-medium text-[#667085] dark:text-gray-400">
                            Active variant
                          </span>
                        </label>
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>

            <div className="border-t border-[#EAECF0] dark:border-gray-800" />

            {/* Product Settings */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#344054] dark:text-gray-100">
                  Product Settings
                </h3>

                <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
                  Control product visibility
                  and labels.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SettingCheckbox
                  title="Active"
                  description="Product is available in the store."
                  checked={isActive}
                  onChange={
                    setIsActive
                  }
                />

                <SettingCheckbox
                  title="Featured"
                  description="Show product as featured."
                  checked={
                    isFeatured
                  }
                  onChange={
                    setIsFeatured
                  }
                />

                <SettingCheckbox
                  title="New Product"
                  description="Mark product as new."
                  checked={isNew}
                  onChange={setIsNew}
                />

                <SettingCheckbox
                  title="Popular"
                  description="Mark product as popular."
                  checked={
                    isPopular
                  }
                  onChange={
                    setIsPopular
                  }
                />
              </div>
            </section>
          </div>

          {/* Footer */}
          <div
            className="
              flex shrink-0
              justify-end gap-3
              border-t border-[#EAECF0]
              bg-white
              px-6 py-4

              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <button
              type="button"
              onClick={onClose}
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
              disabled={
                isSubmitting ||
                isCategoriesLoading ||
                isBrandsLoading
              }
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
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Create Product"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================
   SETTING CHECKBOX
========================= */

interface SettingCheckboxProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const SettingCheckbox = ({
  title,
  description,
  checked,
  onChange,
}: SettingCheckboxProps) => {
  return (
    <label
      className="
        flex cursor-pointer
        items-center justify-between
        gap-3 rounded-xl
        border border-[#EAECF0]
        p-4

        dark:border-gray-700
      "
    >
      <div>
        <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-[#98A2B3] dark:text-gray-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked,
          )
        }
        className="
          h-4 w-4 shrink-0
          cursor-pointer
          accent-[#48A375]
        "
      />
    </label>
  );
};

export default ProductDriver;