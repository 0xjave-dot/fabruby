import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getTodaysColorEntry } from "../../data/colorOfTheDay";
import { products } from "../../data/products";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { rgbaFromHex } from "../../lib/colorTheme";

export function TodayColorSection() {
  const navigate = useNavigate();

  // Get today's curated color entry
  const todayEntry = useMemo(() => getTodaysColorEntry(), []);

  // Resolve product IDs against the product catalog, filtering out missing IDs
  const resolvedProducts = useMemo(() => {
    if (!todayEntry) return [];
    return todayEntry.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is typeof products[number] => !!p);
  }, [todayEntry]);

  if (!todayEntry || resolvedProducts.length === 0) {
    return null;
  }

  const cleanHex = todayEntry.hex.replace("#", "");

  const handleSeeAll = () => {
    navigate(`/all?color=${cleanHex}&type=dress,two-piece`);
  };

  return (
    <div className="w-full" id="todays-color-section">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-[10px] font-black uppercase tracking-[0.24em] text-gray2">
            Color of the day
          </p>
          <h3 className="mt-1 truncate font-display text-[18px] font-black uppercase tracking-tight text-dark">
            Shop {todayEntry.color}
          </h3>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
          style={{
            borderColor: `${todayEntry.hex}33`,
            color: todayEntry.hex,
            backgroundColor: `${todayEntry.hex}10`,
          }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: todayEntry.hex }} />
          Live shade
        </span>
      </div>

      {/* Horizontal scroll displaying resolved products in one line with end CTA card */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5 items-stretch">
        {resolvedProducts.map((prod) => (
          <div key={prod.id} className="w-[155px] md:w-[210px] flex-shrink-0 flex">
            <ProductCard product={prod} />
          </div>
        ))}

        {/* 'See All' interactive CTA Card inside scrollbar */}
        <div
          onClick={handleSeeAll}
          style={{
            borderColor: `${todayEntry.hex}40`,
            background: `linear-gradient(180deg, ${todayEntry.hex}16 0%, rgba(255,255,255,0.92) 74%)`,
            boxShadow: `0 14px 30px ${rgbaFromHex(todayEntry.hex, 0.08)}`,
          }}
          className="w-[155px] md:w-[210px] flex-shrink-0 flex flex-col justify-between items-start text-left p-4 border border-dashed rounded-[20px] cursor-pointer hover:bg-opacity-10 active:scale-[0.97] transition-all group"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${todayEntry.hex}18` }}
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" style={{ color: todayEntry.hex }} strokeWidth={3} />
            </div>
            <div className="h-10 w-px bg-black/5" />
            <div>
              <p className="font-display text-[10px] font-black uppercase tracking-[0.22em] text-gray2">
                Explore
              </p>
              <span className="block font-display text-[13px] font-black uppercase tracking-tight text-dark">
                The collection
              </span>
            </div>
          </div>

          <span
            className="mt-4 inline-flex rounded-full px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-wide"
            style={{ color: todayEntry.hex, backgroundColor: `${todayEntry.hex}10` }}
          >
            {todayEntry.color}
          </span>
        </div>
      </div>
    </div>
  );
}
