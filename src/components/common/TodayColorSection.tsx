import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getTodaysColorEntry } from "../../data/colorOfTheDay";
import { products } from "../../data/products";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";

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
          style={{ borderColor: `${todayEntry.hex}33`, backgroundColor: `${todayEntry.hex}05` }}
          className="w-[155px] md:w-[210px] flex-shrink-0 flex flex-col justify-center items-center text-center p-4 border border-dashed rounded-[20px] cursor-pointer hover:bg-opacity-10 active:scale-[0.97] transition-all group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${todayEntry.hex}15` }}
          >
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" style={{ color: todayEntry.hex }} strokeWidth={3} />
          </div>
          <span className="font-display font-black text-[13px] text-dark uppercase tracking-tight">
            See All In
          </span>
          <span className="font-display font-extrabold text-[12px] uppercase mt-0.5" style={{ color: todayEntry.hex }}>
            {todayEntry.color}
          </span>
        </div>
      </div>
    </div>
  );
}
