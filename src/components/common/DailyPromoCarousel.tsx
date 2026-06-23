import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { getTodaysColorEntry } from "../../data/colorOfTheDay";
import { buildDailyTheme, rgbaFromHex } from "../../lib/colorTheme";

interface PromoSlide {
  productId: string;
}

const slideBlueprints: PromoSlide[] = [
  { productId: "summer-floral-dress" },
  { productId: "classic-heels" },
  { productId: "leather-tote" },
  { productId: "white-sneakers" },
];

export function DailyPromoCarousel() {
  const navigate = useNavigate();
  const todayEntry = useMemo(() => getTodaysColorEntry(), []);
  const theme = useMemo(() => buildDailyTheme(todayEntry.hex), [todayEntry.hex]);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => {
    return slideBlueprints
      .map((slide) => products.find((item) => item.id === slide.productId))
      .filter((product): product is (typeof products)[number] => Boolean(product));
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeSlide >= slides.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const current = slides[activeSlide] ?? slides[0];

  return (
    <div
      className="relative overflow-hidden rounded-[24px] min-h-[220px] sm:min-h-[250px] cursor-pointer select-none"
      style={{
        background: theme.shellBackground,
        boxShadow: `0 14px 34px ${rgbaFromHex(todayEntry.hex, 0.14)}`,
      }}
      onClick={() => navigate(`/product/${current.id}`)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.55)_0%,_transparent_42%)] pointer-events-none" />
      <div
        className="absolute -right-8 bottom-[-28px] h-40 w-40 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: rgbaFromHex(todayEntry.hex, 0.22) }}
      />

      <div key={activeSlide} className="relative h-full min-h-[220px] sm:min-h-[250px] animate-fade-up-enter">
        <img
          src={current.images[0]}
          alt={current.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
        <div className="absolute inset-0 ring-1 ring-white/20" />
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white"
            style={{ backgroundColor: todayEntry.hex }}
          >
            Today's Color: {todayEntry.color}
          </span>
        </div>
      </div>
    </div>
  );
}
