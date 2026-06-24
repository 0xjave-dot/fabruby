import { useState, useMemo } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import { BackButton } from "../../components/layout/BackButton";
import { ProductCard } from "../../components/common/ProductCard";
import { EmptyState } from "../../components/common/EmptyState";
import { FilterSheet, FilterState } from "../../components/common/FilterSheet";
import { products } from "../../data/products";

type ImageSearchState = {
  preview: string;
  dominantColor: string;
  label: string;
  queryHint: string;
};

function parseRgb(rgb: string) {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
  if (!match) {
    return null;
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return null;
  }

  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) {
    return null;
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function colorDistance(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) {
  return Math.sqrt(
    (a.r - b.r) * (a.r - b.r) +
      (a.g - b.g) * (a.g - b.g) +
      (a.b - b.b) * (a.b - b.b)
  );
}

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const query = rawQuery.trim().toLowerCase();
  const imageSearch = (location.state as { imageSearch?: ImageSearchState } | null)?.imageSearch ?? null;
  const imageSearchColor = imageSearch ? parseRgb(imageSearch.dominantColor) : null;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    maxPrice: 100,
    size: "",
    color: "",
    sortBy: "popular",
  });

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (imageSearchColor) {
      list = list
        .map((product) => {
          const primaryColor = product.colorTag || product.colors[0] || "#808080";
          const productColor = hexToRgb(primaryColor) ?? { r: 128, g: 128, b: 128 };

          return {
            product,
            score: colorDistance(imageSearchColor, productColor),
          };
        })
        .sort((a, b) => a.score - b.score)
        .map(({ product }) => product);
    } else if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (quickFilter === "new") {
      list = list.filter((p) => p.tags?.includes("New Arrival"));
    } else if (quickFilter === "sale") {
      list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    } else if (quickFilter === "popular") {
      list = list.filter((p) => p.rating >= 4.7);
    }

    if (filters.category !== "all") {
      list = list.filter((p) => p.category === filters.category);
    }

    list = list.filter((p) => p.price <= filters.maxPrice);

    if (filters.size) {
      list = list.filter((p) => p.sizes.includes(filters.size) || p.sizes.includes("One Size"));
    }

    if (filters.color) {
      list = list.filter((p) => p.colors.includes(filters.color));
    }

    if (filters.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "newest") {
      list.sort((a, b) => (b.tags?.includes("New") ? 1 : 0) - (a.tags?.includes("New") ? 1 : 0));
    } else if (!imageSearchColor) {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [imageSearchColor, query, quickFilter, filters]);

  const quickOptions = ["all", "new", "sale", "popular"];

  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-up-enter min-h-screen">
      <div className="sticky top-0 z-[70] flex-none flex items-center justify-between px-4 sm:px-5 py-2.5 bg-white/92 backdrop-blur-xl border-b border-black/5 gap-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <BackButton />
        <button
          onClick={() => navigate("/search")}
          className="flex-grow flex items-center h-11 bg-gray rounded-full px-4 gap-2 cursor-pointer text-dark select-none text-left"
        >
          <Search className="w-4 h-4 text-gray2" />
          <span className="font-display font-medium text-[14.5px] truncate">
            {rawQuery || "All Products"}
          </span>
        </button>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-1 text-dark hover:opacity-75 focus:outline-none cursor-pointer"
        >
          <SlidersHorizontal className="w-5 h-5 text-dark" />
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-5 space-y-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 select-none">
          {quickOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setQuickFilter(opt)}
              className={`filter-chip px-4 py-1.5 rounded-full border font-display text-[12.5px] font-semibold tracking-tight transition-all uppercase cursor-pointer ${
                quickFilter === opt
                  ? "border-blue bg-blue-light text-blue"
                  : "border-gray3 text-[#555] bg-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-gray2 font-medium px-1">
          <span>
            {filteredProducts.length} items found
            {imageSearch && ` for ${imageSearch.label}`}
          </span>
          {quickFilter !== "all" && (
            <span
              onClick={() => {
                setQuickFilter("all");
                setFilters({
                  category: "all",
                  maxPrice: 100,
                  size: "",
                  color: "",
                  sortBy: "popular",
                });
              }}
              className="text-blue font-bold cursor-pointer hover:underline"
            >
              Clear filters
            </span>
          )}
        </div>

        {imageSearch && (
          <div className="flex items-center gap-3 rounded-[22px] border border-blue/15 bg-blue-light/20 p-3">
            <img
              src={imageSearch.preview}
              alt="Uploaded search"
              className="h-14 w-14 rounded-[16px] object-cover border border-white shadow-sm"
            />
            <div className="min-w-0">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-blue">
                Image search
              </p>
              <p className="truncate font-display text-[14px] font-semibold text-dark">
                Matching by visual tone
              </p>
              <p className="text-xs text-gray2">Detected {imageSearch.label} from your photo.</p>
            </div>
          </div>
        )}

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
            emoji="🔍"
            title="No Results Found"
            description="Try a different keyword or loosen the filters to explore more pieces."
            actionText="Browse All"
            onAction={() => {
              navigate("/search/results?q=");
              setQuickFilter("all");
              setFilters({
                category: "all",
                maxPrice: 100,
                size: "",
                color: "",
                sortBy: "popular",
              });
            }}
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
