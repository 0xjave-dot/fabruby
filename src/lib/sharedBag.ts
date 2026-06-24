import type { CartItem } from "../context/CartContext";

export interface SharedBagPayload {
  items: CartItem[];
  checkoutMode?: "self" | "gift";
  giftRecipientName?: string;
  giftMessage?: string;
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

export function encodeSharedBag(payload: SharedBagPayload) {
  const json = JSON.stringify(payload);
  const bytes = textEncoder.encode(json);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return toBase64Url(binary);
}

export function decodeSharedBag(value: string): SharedBagPayload | null {
  try {
    const binary = fromBase64Url(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = textDecoder.decode(bytes);
    const parsed = JSON.parse(json) as Partial<SharedBagPayload>;

    if (!Array.isArray(parsed.items)) {
      return null;
    }

    return {
      items: parsed.items,
      checkoutMode: parsed.checkoutMode === "gift" ? "gift" : "self",
      giftRecipientName: typeof parsed.giftRecipientName === "string" ? parsed.giftRecipientName : "",
      giftMessage: typeof parsed.giftMessage === "string" ? parsed.giftMessage : "",
    };
  } catch {
    return null;
  }
}
