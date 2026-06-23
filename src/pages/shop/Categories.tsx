import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search, Sparkles, ShoppingBag } from "lucide-react";
import { categories } from "../../data/categories";
import { PageHeader } from "../../components/layout/PageHeader";
import { getReadableTextClass } from "../../lib/colorTheme";

const getCategoryIcon = (slug: string, className: string = "w-5 h-5") => {
  const cat = categories.find((item) => item.slug === slug);
  if (cat?.image) {
    return (
      <img
        src={cat.image}
        alt={cat.name}
        className={`${className} object-contain scale-[1.45] sm:scale-[1.55] origin-center select-none pointer-events-none`}
        loading="eager"
        referrerPolicy="no-referrer"
      />
    );
  }

  return <ShoppingBag className={`${className} shrink-0 stroke-[1.9]`} />;
};

export default function Categories() {
  const navigate = useNavigate();
  const specialBg = "#dfe9ff";
  const specialTextClass = getReadableTextClass(specialBg);

  return (
    <div className="flex-grow flex flex-col bg-white animate-fade-up-enter pb-10">
      <PageHeader
        title="Categories"
        right={
          <button
            onClick={() => navigate("/search")}
            className="p-1.5 hover:opacity-75 focus:outline-none cursor-pointer"
            id="categories-search-btn"
          >
            <Search className="w-5 h-5 text-dark" />
          </button>
        }
      />

      {/* Asymmetric Bento Grid of Categories */}
      <div className="p-5 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat, idx) => {
          // Asymmetric Bento properties based on index
          const isWide = idx === 0 || idx === 5;
          const isSpecial = idx === 2; // Shoes/Bags highlight style matching index

          return (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className={`group flex rounded-[24px] cursor-pointer transition-all hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] active:scale-[0.98] select-none text-left overflow-hidden relative border ${
                isWide 
                ? "col-span-2 p-5 items-center justify-between" 
                : "col-span-1 p-4.5 flex-col justify-between aspect-square"
              } ${
                isSpecial
                  ? "bg-blue-light/20 border-blue/20 text-blue"
                  : "bg-[#f8f8f8] border-[#e5e5e5] text-[#202020]"
              }`}
              id={`bento-category-${cat.id}`}
            >
              {/* Graphic background blob for wide panels */}
              {isWide && (
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-light/20 to-transparent pointer-events-none" />
              )}

              {/* Text Information block */}
              <div className={isWide ? "flex-1" : "mb-2"}>
                <div className="flex items-center gap-1.5">
                  <span className={`${isSpecial ? specialTextClass : "text-dark"}`}>
                    {getCategoryIcon(cat.slug, "w-5 h-5")}
                  </span>
                  <span className={`font-display font-black text-base uppercase tracking-tight ${isSpecial ? specialTextClass : "text-[#202020]"}`}>
                    {cat.name}
                  </span>
                </div>
                <p className={`font-sans text-[11px] font-bold mt-1 ${isSpecial ? "text-[#4b5563]" : "text-[#555]"}`}>
                  {cat.itemCount} Designer Pieces
                </p>
                {isWide && (
                  <div className={`mt-3 flex items-center gap-1 text-[11px] font-bold font-display opacity-85 group-hover:opacity-100 transition-opacity ${isSpecial ? specialTextClass : "text-blue"}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explore Collection</span>
                  </div>
                )}
              </div>

              {/* Visual image element with Bento custom framing */}
              <div
                className={`relative overflow-hidden rounded-2xl border flex items-center justify-center ${
                  isWide
                    ? "w-20 h-20 ml-4 flex-shrink-0"
                    : "w-full h-[84px] mt-2"
                } ${isSpecial ? "border-blue/10 bg-white" : "border-[#e5e5e5] bg-white"}`}
              >
                <div className={`absolute inset-0 ${
                  isSpecial
                    ? "bg-blue-light/10"
                    : "bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04)_0%,_transparent_70%)]"
                }`} />
                <div className={`relative transition-transform duration-500 group-hover:scale-110 ${
                  isSpecial ? specialTextClass : "text-dark"
                }`}>
                  {getCategoryIcon(cat.slug, isWide ? "w-8 h-8" : "w-10 h-10")}
                </div>
              </div>

              {/* Chevron placement */}
              {!isWide && (
                <div className="absolute right-3.5 top-3.5 w-6 h-6 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className={`w-3.5 h-3.5 ${isSpecial ? specialTextClass : "text-dark"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
