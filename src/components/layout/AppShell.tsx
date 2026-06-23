import { useEffect, useMemo, type ReactNode, type CSSProperties } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { useCart } from "../../context/CartContext";
import { ArrowRight, Search } from "lucide-react";
import { buildDailyTheme, rgbaFromHex } from "../../lib/colorTheme";
import { getTodaysColorEntry } from "../../data/colorOfTheDay";
import { WhatsAppFloatingButton } from "../common/WhatsAppFloatingButton";

interface AppShellProps {
  children?: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const todayEntry = useMemo(() => getTodaysColorEntry(), []);
  const theme = useMemo(() => buildDailyTheme(todayEntry.hex), [todayEntry.hex]);

  // Bottom navigation only appears on these primary e-commerce tab screens
  const primaryTabs = ["/", "/wishlist", "/cart", "/profile"];
  const showBottomNav =
    primaryTabs.includes(location.pathname) ||
    location.pathname.startsWith("/category/") ||
    location.pathname === "/all";

  const shellStyle = {
    background: theme.shellBackground,
    color: "#202020",
    ["--color-blue" as string]: theme.accent,
    ["--color-blue-light" as string]: theme.accentLight,
    ["--color-pink" as string]: theme.accent,
  } as CSSProperties;

  useEffect(() => {
    const { style } = document.body;
    const previous = {
      background: style.background,
      color: style.color,
      colorBlue: style.getPropertyValue("--color-blue"),
      colorBlueLight: style.getPropertyValue("--color-blue-light"),
      colorPink: style.getPropertyValue("--color-pink"),
    };

    style.background = theme.shellBackground;
    style.color = "#202020";
    style.setProperty("--color-blue", theme.accent);
    style.setProperty("--color-blue-light", theme.accentLight);
    style.setProperty("--color-pink", theme.accent);

    return () => {
      style.background = previous.background;
      style.color = previous.color;
      style.setProperty("--color-blue", previous.colorBlue);
      style.setProperty("--color-blue-light", previous.colorBlueLight);
      style.setProperty("--color-pink", previous.colorPink);
    };
  }, [theme.accent, theme.accentLight, theme.shellBackground]);

  return (
    <div className="min-h-screen w-full font-sans antialiased text-[#202020]" style={shellStyle}>
      <div className="relative w-full min-h-screen mx-auto bg-white flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.03)] border-x-0 transition-all md:max-w-[1440px] md:min-h-[calc(100vh-24px)] md:my-3 md:rounded-[30px] md:overflow-hidden md:border md:border-black/5">
        <div
          className="flex items-center justify-between gap-3 border-b border-black/5 px-4 sm:px-6 py-2.5 md:py-3"
          style={{
            background: `linear-gradient(135deg, ${theme.accentLighter} 0%, #ffffff 72%)`,
          }}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 0 0 6px ${rgbaFromHex(theme.accent, 0.12)}`,
              }}
            />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 bg-white/70 shadow-sm"
              style={{ color: theme.accent }}
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Desktop/Tablet Header Navigation Bar */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-xl sticky top-0 z-50 select-none">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate("/")}>
            <img
              src="https://i.ibb.co/G4BYJN9h/Gemini-Generated-Image-j1yadkj1yadkj1ya-removebg-preview.png"
              alt="Fabruby logo"
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-black text-xl tracking-tight text-dark uppercase">Fabruby</span>
          </div>

          <nav className="flex items-center gap-6 lg:gap-8">
            <button onClick={() => navigate("/")} className={`font-display font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer ${location.pathname === "/" ? "text-blue" : "text-[#555] hover:text-blue"}`}>Shop</button>

            <button onClick={() => navigate("/wishlist")} className={`font-display font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer ${location.pathname === "/wishlist" ? "text-blue" : "text-[#555] hover:text-blue"}`}>Wishlist</button>
            <button onClick={() => navigate("/cart")} className={`relative font-display font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer ${location.pathname === "/cart" ? "text-blue" : "text-[#555] hover:text-blue"}`}>
              Bag
              {itemCount > 0 && (
                <span className="absolute -top-2.5 -right-3.5 bg-[#f81140] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate("/profile")} className={`font-display font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer ${(location.pathname.startsWith("/profile") || location.pathname.startsWith("/settings")) ? "text-blue" : "text-[#555] hover:text-blue"}`}>Profile</button>
          </nav>

          {/* Header Actions (Search Button) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/search")}
              className="flex items-center gap-2 bg-[#f5f5f5] hover:bg-[#eee] transition-all rounded-full px-4 py-1.75 text-gray2 text-[11px] font-bold tracking-tight select-none cursor-pointer border border-transparent hover:border-blue/20"
            >
              <Search className="w-3.5 h-3.5 text-[#555]" />
              <span>SEARCH COLLECTION</span>
            </button>
          </div>
        </header>

        {/* Scrollable content canvas */}
        <div className={`flex-grow flex flex-col ${showBottomNav ? "pb-[calc(92px+env(safe-area-inset-bottom))] md:pb-0" : ""} overflow-y-auto no-scrollbar`}>
          <div className="w-full mx-auto flex-1 md:px-0">
            {children || <Outlet />}
          </div>
        </div>
        
        {showBottomNav && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}

        <WhatsAppFloatingButton />
      </div>
    </div>
  );
}
