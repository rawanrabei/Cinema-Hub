/**
 * Promo catalog aligned with /offers (CardsOffers). Used at checkout for real totals.
 * Amounts are in USD; discount is capped so the charge stays ≥ $0.01 (payment API minimum).
 */

const round2 = (n) => Math.round(Number(n) * 100) / 100;

/** Metadata for payment UI — keep codes in sync with Offers page */
export const CHECKOUT_PROMO_OPTIONS = [
  { code: "", label: "No offer", description: "" },
  {
    code: "FRIENDS20",
    label: "Friends Special",
    description: "20% off food & drinks (snacks)",
  },
  {
    code: "GROUP15",
    label: "Group Deal",
    description: "15% off when you book 6+ tickets",
  },
  {
    code: "WEEKEND40",
    label: "Weekend Special",
    description: "10% off your order (weekend promo)",
  },
  {
    code: "FAMILY65",
    label: "Family Bundle",
    description: "12% off your order",
  },
  {
    code: "GIFT50",
    label: "Gift card — $50",
    description: "Up to $50 off this checkout",
  },
  {
    code: "GIFT100",
    label: "Gift card — $100",
    description: "Up to $100 off this checkout",
  },
];

/**
 * @param {string} rawCode
 * @param {{ ticketsTotal: number; snacksTotal: number; seatCount: number }} ctx
 * @returns {{ ok: boolean; discount: number; error?: string; appliedLabel?: string }}
 */
export function evaluatePromoCode(rawCode, ctx) {
  const code = (rawCode || "").trim().toUpperCase();
  if (!code) {
    return { ok: true, discount: 0 };
  }

  const ticketsTotal = round2(ctx.ticketsTotal ?? 0);
  const snacksTotal = round2(ctx.snacksTotal ?? 0);
  const seatCount = Math.max(0, Number(ctx.seatCount) || 0);
  const subtotal = round2(ticketsTotal + snacksTotal);

  if (subtotal <= 0) {
    return { ok: false, discount: 0, error: "Nothing to discount yet." };
  }

  const maxDiscount = round2(subtotal - 0.01);

  switch (code) {
    case "FRIENDS20": {
      if (snacksTotal <= 0) {
        return {
          ok: false,
          discount: 0,
          error: "FRIENDS20 applies to food & drinks. Add snacks or pick another offer.",
        };
      }
      const d = round2(snacksTotal * 0.2);
      return {
        ok: true,
        discount: round2(Math.min(d, maxDiscount)),
        appliedLabel: "Friends Special — 20% off snacks",
      };
    }
    case "GROUP15": {
      if (seatCount < 6) {
        return {
          ok: false,
          discount: 0,
          error: "GROUP15 needs at least 6 tickets in this booking.",
        };
      }
      return {
        ok: true,
        discount: round2(Math.min(subtotal * 0.15, maxDiscount)),
        appliedLabel: "Group Deal — 15% off",
      };
    }
    case "WEEKEND40":
      return {
        ok: true,
        discount: round2(Math.min(subtotal * 0.1, maxDiscount)),
        appliedLabel: "Weekend Special — 10% off",
      };
    case "FAMILY65":
      return {
        ok: true,
        discount: round2(Math.min(subtotal * 0.12, maxDiscount)),
        appliedLabel: "Family Bundle — 12% off",
      };
    case "GIFT50":
      return {
        ok: true,
        discount: round2(Math.min(50, maxDiscount)),
        appliedLabel: "Gift card — up to $50",
      };
    case "GIFT100":
      return {
        ok: true,
        discount: round2(Math.min(100, maxDiscount)),
        appliedLabel: "Gift card — up to $100",
      };
    default:
      return {
        ok: false,
        discount: 0,
        error: "Unknown code. Copy a valid code from the Offers page.",
      };
  }
}

export function getTotalDue(subtotal, discount) {
  const s = round2(subtotal);
  const d = round2(Math.max(0, discount));
  return round2(Math.max(0.01, s - d));
}
