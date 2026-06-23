import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { BackButton } from "../../components/layout/BackButton";
import { PageHeader } from "../../components/layout/PageHeader";
import { ProductCard } from "../../components/common/ProductCard";
import { EmptyState } from "../../components/common/EmptyState";
import { FilterSheet, FilterState } from "../../components/common/FilterSheet";
import { products } from "../../data/products";

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const colorParam = searchParams.get("color") || "";
  const typeParam = searchParams.get("type") || "";
  const parsedColor = colorParam ? (colorParam.startsWith("#") ? colorParam : `#${colorParam}`) : "";
  const parsedSubTypes = typeParam ? typeParam.split(",").filter(Boolean) : [];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: "all",
    maxPrice: 50000,
    size: "",
    color: parsedColor,
    sortBy: "popular",
    subTypes: parsedSubTypes,
  }));

  const filteredProducts = useMemo(() => {
    let list = products;

    const activeCat = filters.category;
    if (activeCat === "dresses") {
      list = list.filter((p) => p.subType === "dress");
    } else if (activeCat === "two-pieces") {
      list = list.filter((p) => p.subType === "two-piece");
    } else if (activeCat === "shoes") {
      list = list.filter((p) => p.category === "shoes");
    } else if (activeCat === "handbags") {
      list = list.filter((p) => p.category === "bags");
    } else if (activeCat && activeCat !== "all") {
      list = list.filter((p) => p.category === activeCat);
    }

    if (quickFilter === "new") {
      list = list.filter((p) => p.tags?.includes("New Arrival") || p.tags?.includes("Trending"));
    } else if (quickFilter === "sale") {
      list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    } else if (quickFilter === "popular") {
      list = list.filter((p) => p.rating >= 4.7);
    } else if (quickFilter === "under45k") {
      list = list.filter((p) => p.price <= 45000);
    }

    list = list.filter((p) => p.price <= filters.maxPrice);

    if (filters.size) {
      list = list.filter((p) => p.sizes.includes(filters.size) || p.sizes.includes("One Size"));
    }

    if (filters.color) {
      const target = filters.color.toLowerCase();
      list = list.filter(
        (p) =>
          p.colors.some((c) => c.toLowerCase() === target) ||
          (p.colorTag && p.colorTag.toLowerCase() === target)
      );
    }

    if (filters.subTypes && filters.subTypes.length > 0) {
      list = list.filter((p) => p.subType && filters.subTypes.includes(p.subType));
    }

    if (filters.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "newest") {
      list.sort((a, b) => (b.tags?.includes("New") ? 1 : 0) - (a.tags?.includes("New") ? 1 : 0));
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [quickFilter, filters]);

  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-up-enter min-h-screen">
      <PageHeader
        title="All Products"
        left={<BackButton />}
        right={
          <button onClick={() => setIsFilterOpen(true)} className="p-1 text-dark hover:opacity-75 focus:outline-none cursor-pointer">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        }
      />

      <div className="flex-grow p-4 sm:p-5 space-y-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 select-none">
          {[
            { id: "all", label: "All" },
            { id: "new", label: "New" },
            { id: "sale", label: "Sale" },
            { id: "popular", label: "Popular" },
            { id: "under45k", label: "Under ₦45k" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setQuickFilter(item.id)}
              className={`filter-chip px-3.5 py-1.5 rounded-full border font-display text-[12.5px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                quickFilter === item.id ? "border-blue bg-blue-light text-blue" : "border-gray3 text-[#555] bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-gray2 font-medium px-1">
          <span>{filteredProducts.length} items found</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="flex">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            emoji="🛍️"
            title="No Products"
            description="We could not find anything matching your filters. Try broadening the search."
            actionText="Browse Home"
            onAction={() => navigate("/")}
          />
        )}
      </div>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
      />
    </div>
  );
}
