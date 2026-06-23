import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { TodayColorSection } from "../../components/common/TodayColorSection";
import { DailyPromoCarousel } from "../../components/common/DailyPromoCarousel";
import { ScrollReveal } from "../../components/common/ScrollReveal";
import { ProductCard } from "../../components/common/ProductCard";
import { useCart } from "../../context/CartContext";
import { ProductCardSkeleton } from "../../components/common/Skeleton";
import { getTodaysColorEntry } from "../../data/colorOfTheDay";
import { getReadableTextClass } from "../../lib/colorTheme";

const getCategoryIcon = (slug: string, className: string = "w-5 h-5 sm:w-6 sm:h-6") => {
  const cat = categories.find((item) => item.slug === slug);
  if (cat?.image) {
    return (
      <img
        src={cat.image}
        alt={cat.name}
        className={`${className} object-contain scale-[1.35] sm:scale-[1.45] origin-center select-none pointer-events-none`}
        loading="eager"
        referrerPolicy="no-referrer"
      />
    );
  }

  return <ShoppingBag className={`${className} shrink-0 stroke-[1.9]`} />;
};

export default function Home() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("dresses");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Today's Curated color entry for high-impact header theme
  const todayEntry = useMemo(() => getTodaysColorEntry(), []);
  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name ?? "Category";
  const activeCategoryTextClass = getReadableTextClass(todayEntry.hex);
  const goToActiveCategory = () => navigate(`/category/${activeCategory}`);

  // Filter products for selected active category
  const categoryProducts = useMemo(() => {
    if (activeCategory === "dresses") {
      return products.filter((p) => p.subType === "dress");
    } else if (activeCategory === "two-pieces") {
      return products.filter((p) => p.subType === "two-piece");
    } else if (activeCategory === "shoes") {
      return products.filter((p) => p.category === "shoes");
    } else if (activeCategory === "handbags") {
      return products.filter((p) => p.category === "bags");
    }
    return [];
  }, [activeCategory]);

  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-up-enter pb-10">
      {/* Top Header Section */}
      <div className="sticky top-0 z-[90] flex md:hidden shrink-0 items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-white/90 backdrop-blur-xl border-b border-[#e5e5e5] shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-1.5 flex-1 select-none">
          <img
            src="https://i.ibb.co/G4BYJN9h/Gemini-Generated-Image-j1yadkj1yadkj1ya-removebg-preview.png"
            alt="Fabruby logo"
            className="w-7 h-7 object-contain"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-display font-black text-[22px] tracking-tight text-dark uppercase">
            Fabruby
          </h1>
        </div>

        {/* Real Cart Badge with bounce */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer w-8 h-8 flex items-center justify-center bg-gray rounded-full hover:bg-gray3/30"
        >
          <ShoppingBag className="w-5 h-5 text-dark" strokeWidth={2} />
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
              {itemCount}
            </div>
          )}
        </div>
      </div>

      {/* Main Home Scroll Area */}
      <div className="px-4 sm:px-5 space-y-6">
        <ScrollReveal className="mt-4">
          <DailyPromoCarousel />
        </ScrollReveal>

        {/* Today's Color Daily Drop Section */}
        <ScrollReveal delay={0.05}>
          <TodayColorSection />
        </ScrollReveal>

        {/* Categories Circular Quick Hub */}
        <ScrollReveal delay={0.08} className="py-2.5 flex justify-center w-full">
          <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-md">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="aspect-square rounded-2xl bg-[#f8f8f8] animate-pulse" />
              ))
            ) : (
              categories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className="relative group flex flex-col items-center justify-center cursor-pointer"
                  >
                    {/* Floating Elegant Tooltip */}
                    <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-dark text-white text-[10px] font-black uppercase tracking-wider rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg scale-95 group-hover:scale-100 border border-white/10">
                      <span>{cat.name}</span>
                    </div>

                    {/* Icon Outer Container */}
                    <div
                      style={isActive ? { backgroundColor: todayEntry.hex, borderColor: todayEntry.hex } : undefined}
                      className={`relative w-[3.75rem] h-[3.75rem] sm:w-[4.25rem] sm:h-[4.25rem] aspect-square rounded-[22px] border flex items-center justify-center transition-all duration-300 shadow-subtle active:scale-95 overflow-hidden ${
                        isActive
                          ? `${activeCategoryTextClass} -translate-y-0.5 shadow-[0_10px_24px_rgba(0,0,0,0.16)] border-transparent`
                          : "border-gray3 bg-white text-dark hover:bg-dark hover:border-dark hover:text-white hover:-translate-y-0.5 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35)_0%,_transparent_65%)] pointer-events-none" />
                      <div className="relative transition-transform duration-300 group-hover:scale-110">
                        {getCategoryIcon(cat.slug, "w-6 h-6 sm:w-7 sm:h-7")}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollReveal>

        {/* Dynamic Category Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-0.5 border-b border-[#e5e5e5]">
            <h2 className="font-display font-black text-lg tracking-tight uppercase text-dark flex items-center gap-2">
              <span className="text-dark">{getCategoryIcon(activeCategory, "w-5 h-5")}</span>
              <span>{activeCategoryName}</span>
            </h2>
            <button
              onClick={goToActiveCategory}
              className="font-display text-[11px] font-black uppercase tracking-wider text-dark bg-gray hover:bg-gray3/30 px-3.5 py-1.5 rounded-full border border-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            ) : (
              categoryProducts.slice(0, 8).map((prod, index) => (
                <React.Fragment key={prod.id}>
                  <ScrollReveal delay={index * 0.05} className="flex">
                    <ProductCard product={prod} />
                  </ScrollReveal>
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        <ScrollReveal className="pt-1 pb-24 sm:pb-28 flex justify-center">
          <button
            onClick={goToActiveCategory}
            className="inline-flex h-12 items-center justify-center rounded-full bg-dark px-6 font-display text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition hover:scale-[1.02] active:scale-[0.98]"
          >
            View All Products
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
