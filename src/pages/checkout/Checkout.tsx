import { useNavigate } from "react-router-dom";
import { ShieldCheck, MapPin, ChevronRight, AlertCircle } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { BackButton } from "../../components/layout/BackButton";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { useToast } from "../../context/ToastContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const { currencySymbol, userProfile, account } = useSettings();
  const { items, appliedVoucher, subtotal, discountAmount, shippingFee, total } = useCart();

  const defaultAddress = account.shippingAddresses.items.find((address) => address.isDefault) ?? account.shippingAddresses.items[0];

  if (items.length === 0) {
    return (
      <div className="p-5 text-center flex flex-col justify-center items-center h-[50vh]">
        <h3 className="title-md font-display">No items to checkout</h3>
        <button onClick={() => navigate("/")} className="btn-primary mt-4">
          Browse items
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    pushToast("Reviewing order and continuing to the demo payment step.");
    navigate("/checkout/processing");
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-up-enter min-h-screen pb-10">
      <PageHeader title="Checkout" left={<BackButton />} />

      <div className="p-4 sm:p-5 lg:p-6 xl:p-8 flex-1">
        <div className="mx-auto w-full max-w-6xl grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_420px] items-start">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-black/[0.05] bg-white shadow-subtle overflow-hidden">
              <div className="border-b border-gray3/30 px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-sm tracking-tight text-dark">
                    Shipping Address
                  </h3>
                  <p className="font-sans text-xs text-gray2 mt-1">
                    Confirm the delivery address before completing the order.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/settings/shipping-address")}
                  className="text-[12.5px] font-display font-bold text-blue hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <div
                onClick={() => navigate("/settings/shipping-address")}
                className="p-5 flex items-start gap-4 cursor-pointer hover:bg-gray/40 transition-colors"
              >
                <div className="w-[42px] h-[42px] bg-blue-light/50 rounded-std flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-extrabold text-[15px] text-dark">
                    {defaultAddress?.name || userProfile.name || "Add shipping address"}
                  </div>
                  <p className="font-sans text-sm text-gray2 leading-relaxed mt-1">
                    {defaultAddress
                      ? defaultAddress.street
                      : "Tap to add a shipping address so this order can be delivered."}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray2 self-center" />
              </div>
            </div>

            <div className="rounded-[28px] border border-black/[0.05] bg-white shadow-subtle overflow-hidden">
              <div className="border-b border-gray3/30 px-5 py-4">
                <h3 className="font-display font-black text-sm tracking-tight text-dark">
                  Payment Preview
                </h3>
                <p className="font-sans text-xs text-gray2 mt-1">
                  This build simulates the payment flow you will wire to Paystack later.
                </p>
              </div>
              <div className="p-5">
                <div className="rounded-[22px] bg-[#0f172a] text-white p-5 sm:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="relative flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-[11px] font-display font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Demo checkout
                      </div>
                      <h4 className="font-display font-black text-[22px] sm:text-[24px] mt-4 leading-tight">
                        Clean, premium handoff
                      </h4>
                      <p className="font-sans text-sm text-white/70 leading-relaxed mt-3 max-w-[420px]">
                        The live version can hand off to Paystack. For now, we keep the demo honest and finish with a confirmed order summary.
                      </p>
                    </div>
                    <div className="hidden sm:flex w-[84px] h-[84px] rounded-[22px] bg-white/10 items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-black/[0.05] bg-white shadow-subtle overflow-hidden">
              <div className="border-b border-gray3/30 px-5 py-4">
                <h3 className="font-display font-black text-sm tracking-tight text-dark">
                  Order Summary
                </h3>
              </div>
              <div className="p-5 space-y-3.5">
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="font-sans text-gray2">{items.length} items</span>
                  <span className="font-display font-bold text-dark">
                    {currencySymbol}
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[13.5px]">
                    <span className="font-sans text-gray2">
                      Discount {appliedVoucher ? `(${appliedVoucher.code})` : ""}
                    </span>
                    <span className="font-display font-bold text-red">
                      -{currencySymbol}
                      {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="font-sans text-gray2">Shipping</span>
                  <span className={`font-display font-bold ${shippingFee === 0 ? "text-blue" : "text-dark"}`}>
                    {shippingFee === 0 ? "FREE" : `${currencySymbol}${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="divider h-[1px] bg-gray3 my-1" />

                <div className="flex justify-between items-center text-dark">
                  <span className="font-display font-bold text-sm">Total Price</span>
                  <span className="price text-[19px] text-blue font-display">
                    {currencySymbol}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-[28px] border border-black/[0.05] bg-[#f8f8f8] p-5 shadow-subtle">
              <p className="font-display font-black text-[10.5px] text-[#c7c7c7] tracking-wider uppercase">
                Ready to pay
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-std bg-white flex items-center justify-center border border-black/5">
                  <ShieldCheck className="w-5 h-5 text-blue" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-dark">Demo payment</div>
                  <p className="font-sans text-xs text-gray2 mt-0.5">
                    Confirmed in the app, then ready for Paystack wiring.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="btn-primary w-full h-[58px] bg-blue text-white rounded-std text-[15px] font-display font-extrabold shadow-std active:scale-[0.98] transition-transform flex items-center justify-center cursor-pointer"
            >
              Complete Order
            </button>

            <div className="rounded-[20px] border border-amber-200 bg-amber-50 p-4 text-[12px] text-amber-900 flex gap-3">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="font-sans leading-relaxed">
                This is a demo build. Add your live Paystack keys and webhook verification before going public.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
