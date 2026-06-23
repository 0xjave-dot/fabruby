import { PageHeader } from "../../components/layout/PageHeader";
import { BackButton } from "../../components/layout/BackButton";
import { ShieldCheck, HelpingHand, Scale } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function About() {
  const { pushToast } = useToast();

  const handleDocumentClick = (doc: string) => {
    pushToast(`Displaying ${doc} disclosure... 📃`);
  };

  return (
    <div className="flex-grow flex flex-col bg-white animate-fade-up-enter min-h-screen pb-10">
      <PageHeader title="About Fabruby" left={<BackButton />} />

      <div className="p-5 space-y-6 text-left">
        {/* Core Vision Block */}
        <div className="flex flex-col items-center text-center py-6 select-none border-b border-gray3/30 select-none">
          <img
            src="https://i.ibb.co/G4BYJN9h/Gemini-Generated-Image-j1yadkj1yadkj1ya-removebg-preview.png"
            alt="Fabruby Logo"
            className="w-20 h-20 object-contain mb-3"
            referrerPolicy="no-referrer"
          />
          <div className="font-display font-black text-[30px] tracking-tight uppercase text-blue">
            Fabruby
          </div>
          <p className="font-sans text-xs text-gray2 leading-tight mt-1.5 font-semibold">
            Premium Fashion Lookbook &middot; Version 2.4.0
          </p>
        </div>

        <p className="font-sans text-[13.5px] leading-relaxed text-[#555] mx-1">
          Fabruby is a premium fashion catalog curated for modern tastemakers. Our collections are stitched with local artisanal sustainable wools, organic cotton blends, and verified leather items. Every purchase supports fair-trade apparel guidelines globally.
        </p>

        {/* Legal disclosures list links */}
        <div className="space-y-3.5 pt-2">
          {/* Terms */}
          <div
            onClick={() => handleDocumentClick("Terms of Service")}
            className="flex items-center gap-3.5 p-4 rounded-std border border-[#f0f0f0] cursor-pointer hover:bg-gray/40 select-none"
          >
            <Scale className="w-5 h-5 text-blue" />
            <div>
              <span className="font-display font-bold text-[14px] text-dark">Terms of Service</span>
              <p className="font-sans text-[10.5px] text-gray2 leading-none mt-0.5">Updated June 2026</p>
            </div>
          </div>

          {/* Privacy */}
          <div
            onClick={() => handleDocumentClick("Privacy Policy")}
            className="flex items-center gap-3.5 p-4 rounded-std border border-[#f0f0f0] cursor-pointer hover:bg-gray/40 select-none"
          >
            <ShieldCheck className="w-5 h-5 text-blue" />
            <div>
              <span className="font-display font-bold text-[14px] text-dark font-extrabold">Privacy & Cookies Policy</span>
              <p className="font-sans text-[10.5px] text-gray2 leading-none mt-0.5">Updated March 2026</p>
            </div>
          </div>

          {/* Help center */}
          <div
            onClick={() => handleDocumentClick("User Licenses")}
            className="flex items-center gap-3.5 p-4 rounded-std border border-[#f0f0f0] cursor-pointer hover:bg-gray/40 select-none"
          >
            <HelpingHand className="w-5 h-5 text-blue" />
            <div>
              <span className="font-display font-bold text-[14px] text-dark">Supplier Fair-Trade Licenses</span>
              <p className="font-sans text-[10.5px] text-gray2 leading-none mt-0.5">Updated May 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
