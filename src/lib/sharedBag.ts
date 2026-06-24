import { products } from "../data/products";
import type { CartItem } from "../context/CartContext";

type SharedBagItemTuple = [productId: string, size: string, color: string, qty: number];

interface SharedBagV2Payload {
  v: 2;
  i: SharedBagItemTuple[];
  m?: "g";
}

interface LegacySharedBagPayload {
  items?: CartItem[];
  checkoutMode?: "self" | "gift";
  giftRecipientName?: string;
  giftMessage?: string;
}

export interface DecodedSharedBag {
  items: CartItem[];
  checkoutMode: "self" | "gift";
  giftRecipientName: string;
  giftMessage: string;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64Url(value: string) {
  const base64 = btoa(value);
  return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/");
  const fixed = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  return atob(fixed);
}

function cartItemToTuple(item: CartItem): SharedBagItemTuple {
  return [item.productId, item.size, item.color, item.qty];
}

function tupleToCartItem(tuple: unknown): CartItem | null {
  if (!Array.isArray(tuple) || tuple.length < 4) {
    return null;
  }

  const [productId, size, color, qty] = tuple;

  if (
    typeof productId !== "string" ||
    typeof size !== "string" ||
    typeof color !== "string" ||
    typeof qty !== "number" ||
    !Number.isFinite(qty) ||
    qty <= 0
  ) {
    return null;
  }

  const product = products.find((entry) => entry.id === productId);

  if (!product) {
    return null;
  }

  return {
    productId: product.id,
    name: product.name,
    image: product.images[0] ?? "",
    price: product.price,
    size,
    color,
    qty,
  };
}

function normalizeItems(items: unknown): CartItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Partial<CartItem>;
      const product = candidate.productId ? products.find((entry) => entry.id === candidate.productId) : null;

      if (
        !product ||
        typeof candidate.productId !== "string" ||
        typeof candidate.size !== "string" ||
        typeof candidate.color !== "string" ||
        typeof candidate.qty !== "number" ||
        !Number.isFinite(candidate.qty) ||
        candidate.qty <= 0
      ) {
        return null;
      }

      return {
        productId: candidate.productId,
        name: product.name,
        image: product.images[0] ?? "",
        price: product.price,
        size: candidate.size,
        color: candidate.color,
        qty: candidate.qty,
      };
    })
    .filter((item): item is CartItem => Boolean(item));
}

export function encodeSharedBag(items: CartItem[], checkoutMode: "self" | "gift" = "self") {
  const payload: SharedBagV2Payload = {
    v: 2,
    i: items.map(cartItemToTuple),
    ...(checkoutMode === "gift" ? { m: "g" } : {}),
  };

  const json = JSON.stringify(payload);
  const bytes = textEncoder.encode(json);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return toBase64Url(binary);
}

export function decodeSharedBag(value: string): DecodedSharedBag | null {
  try {
    const binary = fromBase64Url(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = textDecoder.decode(bytes);
    const parsed = JSON.parse(json) as Partial<SharedBagV2Payload & LegacySharedBagPayload>;

    if (parsed.v === 2 && Array.isArray(parsed.i)) {
      const items = parsed.i.map(tupleToCartItem).filter((item): item is CartItem => Boolean(item));

      if (items.length === 0) {
        return null;
      }

      return {
        items,
        checkoutMode: parsed.m === "g" ? "gift" : "self",
        giftRecipientName: "",
        giftMessage: "",
      };
    }

    if (!Array.isArray(parsed.items)) {
      return null;
    }

    const items = normalizeItems(parsed.items);

    if (items.length === 0) {
      return null;
    }

    return {
      items,
      checkoutMode: parsed.checkoutMode === "gift" ? "gift" : "self",
      giftRecipientName: typeof parsed.giftRecipientName === "string" ? parsed.giftRecipientName : "",
      giftMessage: typeof parsed.giftMessage === "string" ? parsed.giftMessage : "",
    };
  } catch {
    return null;
  }
}
