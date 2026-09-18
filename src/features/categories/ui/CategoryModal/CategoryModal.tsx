import { useEffect, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

import {
    createCategory,
    updateCategory,
} from "../../services/categories.service";

import type {
    Category,
    CategoryPayload,
} from "../../types/categories.types";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: "create" | "edit";
    category?: Category | null;
    categories?: Category[];
    onSuccess?: () => void;
}

const CategoryModal = ({
    isOpen,
    onClose,
    mode = "create",
    category = null,
    categories = [],
    onSuccess,
}: CategoryModalProps) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [parentId, setParentId] = useState("");
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        if (mode === "edit" && category) {
            setName(category.name ?? "");
            setSlug(category.slug ?? "");
            setDescription(category.description ?? "");
            setImage(category.image ?? "");
            setParentId(category.parentId ?? "");
            setSortOrder(category.sortOrder ?? 0);
            setIsActive(category.isActive ?? true);
        } else {
            setName("");
            setSlug("");
            setDescription("");
            setImage("");
            setParentId("");
            setSortOrder(0);
            setIsActive(true);
        }

        setError("");
    }, [isOpen, mode, category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Category name is required.");
            return;
        }

        if (!slug.trim()) {
            setError("Slug is required.");
            return;
        }

        const payload: CategoryPayload = {
            name: name.trim(),
            slug: slug.trim(),
            description: description.trim(),
            image: image.trim(),
            parentId: parentId || null,
            isActive,
            sortOrder,
        };

        try {
            setIsSubmitting(true);
            setError("");

            if (mode === "edit") {
                if (!category) {
                    setError("Category not found.");
                    return;
                }

                await updateCategory(category.id, payload);
            } else {
                await createCategory(payload);
            }

            await onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error("Failed to save category:", error);

            setError(
                error.response?.data?.message ||
                "Failed to save category. Please try again.",
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
        flex items-center justify-center
        bg-black/40 p-4
        backdrop-blur-[2px]
      "
        >
            <form
                onSubmit={handleSubmit}
                className="
          w-full max-w-[560px]
          overflow-hidden rounded-2xl
          border border-[#EAECF0]
          bg-white shadow-2xl

          dark:border-gray-800
          dark:bg-gray-900
        "
            >
                {/* Header */}
                <div
                    className="
            flex items-center justify-between
            border-b border-[#EAECF0]
            px-6 py-5
            dark:border-gray-800
          "
                >
                    <div>
                        <h2 className="text-base font-bold text-[#344054] dark:text-gray-100">
                            {mode === "create" ? "Add Category" : "Edit Category"}
                        </h2>

                        <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
                            {mode === "create"
                                ? "Create a new product category."
                                : "Update category information."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="
              flex h-9 w-9 cursor-pointer
              items-center justify-center
              rounded-lg text-[#98A2B3]
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

                {/* Body */}
                <div className="space-y-5 p-6">
                    {/* Error */}
                    {error && (
                        <div
                            className="
                rounded-xl border border-red-200
                bg-red-50 px-4 py-3
                text-xs font-medium text-red-600

                dark:border-red-900
                dark:bg-red-950/30
                dark:text-red-400
              "
                        >
                            {error}
                        </div>
                    )}

                    {/* Image */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold text-[#667085] dark:text-gray-400">
                            Category Image
                        </label>

                        <div
                            className="
                flex items-center gap-4
                rounded-xl border border-[#EAECF0]
                bg-[#F8FAF9] p-4

                dark:border-gray-700
                dark:bg-gray-800
              "
                        >
                            <div
                                className="
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  overflow-hidden rounded-xl
                  border border-[#EAECF0]
                  bg-white

                  dark:border-gray-700
                  dark:bg-gray-900
                "
                            >
                                {image ? (
                                    <img
                                        src={image}
                                        alt={name || "Category"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon
                                        size={22}
                                        className="text-[#98A2B3] dark:text-gray-500"
                                    />
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                                    Image URL
                                </p>

                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="https://example.com/category.jpg"
                                    className="
                    mt-2 w-full rounded-lg
                    border border-[#EAECF0]
                    bg-white px-3 py-2
                    text-xs text-[#344054]
                    outline-none transition

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

                    {/* Name + Slug */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Accessories"
                                required
                                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-[#344054]
                  outline-none transition

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
                            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
                                Slug
                            </label>

                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="accessories"
                                required
                                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-[#344054]
                  outline-none transition

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
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write category description..."
                            className="
                w-full resize-none rounded-lg
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

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-100
              dark:focus:bg-gray-800
              "
                        />
                    </div>

                    {/* Parent + Sort */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
                                Parent Category
                            </label>

                            <select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                className="
                  w-full cursor-pointer rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs text-[#344054]
                  outline-none transition

                  focus:border-[#48A375]
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100
                "
                            >
                                <option value="">No parent category</option>

                                {categories
                                    .filter((item) => item.id !== category?.id)
                                    .map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
                                Sort Order
                            </label>

                            <input
                                type="number"
                                value={sortOrder}
                                onChange={(e) =>
                                    setSortOrder(Number(e.target.value))
                                }
                                min={0}
                                className="
                  w-full rounded-lg
                  border border-[#EAECF0]
                  bg-[#F8FAF9]
                  px-3.5 py-2.5
                  text-xs font-semibold
                  text-[#344054]
                  outline-none transition

                  focus:border-[#48A375]
                  focus:ring-2
                  focus:ring-[#48A375]/10

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-100
                "
                            />
                        </div>
                    </div>

                    {/* Active */}
                    <label
                        className="
              flex cursor-pointer
              items-center justify-between
              rounded-xl
              border border-[#EAECF0]
              p-4

              dark:border-gray-700
            "
                    >
                        <div>
                            <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                                Active Category
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#98A2B3] dark:text-gray-500">
                                Category will be available in the store.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="h-4 w-4 cursor-pointer accent-[#48A375]"
                        />
                    </label>
                </div>

                {/* Footer */}
                <div
                    className="
            flex justify-end gap-3
            border-t border-[#EAECF0]
            px-6 py-4

            dark:border-gray-800
          "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="
              cursor-pointer rounded-lg
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
              cursor-pointer rounded-lg
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
                                ? "Create Category"
                                : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryModal;