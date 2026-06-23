import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Voucher, vouchers } from "../data/vouchers";
import { useSettings } from "./SettingsContext";
import { UserCartDoc } from "../lib/userAccount";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  appliedVoucher: Voucher | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function updateCartDoc(current: UserCartDoc, next: Partial<UserCartDoc>) {
  return {
    ...current,
    ...next,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { account, updateAccount } = useSettings();
  const cart = account.cart;

  const items = cart.items;
  const appliedVoucher = cart.appliedVoucherCode
    ? vouchers.find((voucher) => voucher.code.toUpperCase() === cart.appliedVoucherCode?.toUpperCase()) ?? null
    : null;

  const persistCart = (next: UserCartDoc) => {
    updateAccount({
      ...account,
      cart: next,
    });
  };

  const addItem = (newItem: Omit<CartItem, "qty"> & { qty?: number }) => {
    const qtyToAdd = newItem.qty ?? 1;
    const existingIndex = items.findIndex(
      (i) => i.productId === newItem.productId && i.size === newItem.size && i.color === newItem.color
    );

    const nextItems =
      existingIndex > -1
        ? items.map((item, index) =>
            index === existingIndex ? { ...item, qty: item.qty + qtyToAdd } : item
          )
        : [...items, { ...newItem, qty: qtyToAdd }];

    persistCart(updateCartDoc(cart, { items: nextItems, appliedVoucherCode: cart.appliedVoucherCode }));
  };

  const updateQty = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, size, color);
      return;
    }

    const nextItems = items.map((item) =>
      item.productId === productId && item.size === size && item.color === color
        ? { ...item, qty }
        : item
    );

    persistCart(updateCartDoc(cart, { items: nextItems }));
  };

  const removeItem = (productId: string, size: string, color: string) => {
    const nextItems = items.filter(
      (item) => !(item.productId === productId && item.size === size && item.color === color)
    );
    persistCart(updateCartDoc(cart, { items: nextItems }));
  };

  const clearCart = () => {
    persistCart({ items: [], appliedVoucherCode: null });
  };

  const applyVoucher = (code: string): boolean => {
    const voucher = vouchers.find((v) => v.code.toUpperCase() === code.trim().toUpperCase());
    if (voucher) {
      persistCart(updateCartDoc(cart, { appliedVoucherCode: voucher.code }));
      return true;
    }
    return false;
  };

  const removeVoucher = () => {
    persistCart(updateCartDoc(cart, { appliedVoucherCode: null }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === "percent") {
      discountAmount = (subtotal * appliedVoucher.value) / 100;
    } else if (appliedVoucher.discountType === "fixed") {
      discountAmount = Math.min(subtotal, appliedVoucher.value);
    }
  }

  const isFreeShipping =
    subtotal > 50 || (appliedVoucher && appliedVoucher.discountType === "freeshipping");
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 4.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
