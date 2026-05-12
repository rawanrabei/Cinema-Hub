import React, { useMemo, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../Components/Footer/Footer";
import {
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaTag,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";
import {
  CHECKOUT_PROMO_OPTIONS,
  evaluatePromoCode,
  getTotalDue,
} from "../../data/promoOffers";
import { API_BASE_URL } from "../../config/api";

const BOOKING_FALLBACK_BASE = import.meta.env.VITE_BOOKING_URL || "";

const formatCardGroups = (raw) => {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const Payment = () => {
  const { isDarkMode, colors } = useTheme();
  const { ticketData, getSnacksTotal, getGrandTotal } = useBooking();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [promoSelect, setPromoSelect] = useState("");
  const [promoManual, setPromoManual] = useState("");
  /** Code last accepted with "Apply offer" (empty = no promo on the bill) */
  const [appliedCode, setAppliedCode] = useState("");
  const [promoApplyError, setPromoApplyError] = useState("");

  const ticketsTotal = ticketData?.ticketPrice ?? 0;
  const snacksTotal = getSnacksTotal();
  const seatCount = ticketData?.seats?.length ?? 0;

  const subtotal = useMemo(() => {
    const combined = Math.round((ticketsTotal + snacksTotal) * 100) / 100;
    if (combined > 0) return combined;
    const fallback = getGrandTotal();
    return Math.round(fallback * 100) / 100;
  }, [ticketsTotal, snacksTotal, getGrandTotal]);

  const pendingPromoCode = useMemo(() => {
    const manual = promoManual.trim().toUpperCase();
    if (manual) return manual;
    return (promoSelect || "").trim().toUpperCase();
  }, [promoManual, promoSelect]);

  const promoResult = useMemo(
    () =>
      evaluatePromoCode(appliedCode, {
        ticketsTotal,
        snacksTotal,
        seatCount,
      }),
    [appliedCode, ticketsTotal, snacksTotal, seatCount],
  );

  const discount = promoResult.ok ? promoResult.discount : 0;
  const totalDue = getTotalDue(subtotal, discount);

  const syncSelectFromManual = useCallback((manualValue) => {
    const u = manualValue.trim().toUpperCase();
    const match = CHECKOUT_PROMO_OPTIONS.find((o) => o.code === u);
    if (match) setPromoSelect(match.code);
    else if (!u) setPromoSelect("");
  }, []);

  const handleApplyPromo = () => {
    setPromoApplyError("");
    const code = pendingPromoCode;
    const result = evaluatePromoCode(code, {
      ticketsTotal,
      snacksTotal,
      seatCount,
    });
    if (!result.ok && code) {
      setPromoApplyError(result.error || "Invalid promo code.");
      return;
    }
    setAppliedCode(code);
  };

  const confirmBookingAfterPayment = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    const primary = `${API_BASE_URL}/api/bookings/${id}/confirm`;
    let res = await fetch(primary, { method: "POST", headers });
    if (res.ok) return res;
    if (res.status === 404 && BOOKING_FALLBACK_BASE) {
      const fallback = `${BOOKING_FALLBACK_BASE.replace(/\/$/, "")}/api/bookings/${id}/confirm`;
      res = await fetch(fallback, { method: "POST", headers });
    }
    return res;
  };

  const handlePayClick = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!bookingId) {
        throw new Error("Missing booking. Please complete the booking step first.");
      }

      if (pendingPromoCode !== (appliedCode || "").trim().toUpperCase()) {
        throw new Error('Click "Apply offer" so your total matches the code in the box.');
      }

      if (!promoResult.ok && appliedCode) {
        throw new Error(promoResult.error || "Invalid promo code.");
      }

      let userId = user?.id;
      if (typeof userId === "string" && Number.isNaN(parseInt(userId, 10))) {
        const profileResponse = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          userId = profileData.id;
        } else {
          throw new Error("Failed to fetch user profile");
        }
      }

      const paymentRequest = {
        bookingId,
        userId: userId || 1,
        amount: totalDue,
        paymentMethod: selectedPayment === "card" ? "CREDIT_CARD" : "CASH",
      };

      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Payment failed");
      }

      const payment = await response.json();

      const confirmRes = await confirmBookingAfterPayment(bookingId);
      if (!confirmRes.ok) {
        const confirmErr = await confirmRes.text();
        throw new Error(
          confirmErr ||
            "Payment went through but we could not finalize your booking. Please contact support.",
        );
      }

      navigate("/confirmation", {
        state: {
          paymentId: payment.id,
          bookingId,
          paidAmount: totalDue,
          promoCode: appliedCode || null,
        },
      });
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const panelClass = `rounded-2xl border transition-colors duration-300 ${
    isDarkMode ? "bg-[#0f0f12] border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" : "bg-white border-gray-200 shadow-sm"
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wide mb-2 ${
    isDarkMode ? "text-gray-400" : "text-gray-500"
  }`;

  const inputClass = `w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 transition-colors duration-300 ${
    isDarkMode
      ? "bg-gray-900/80 border-white/15 text-white placeholder-gray-500 focus:border-transparent focus:ring-white/20"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-black/10"
  }`;

  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";
  const heading = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#070708]" : "bg-[#f4f5f7]"}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <FaArrowLeft className="text-xs" />
          Back to booking
        </button>

        <div className="mb-10">
          <p className={`text-sm font-medium uppercase tracking-widest mb-2 ${muted}`}>Checkout</p>
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${heading}`}>Secure payment</h1>
          <p className={`mt-2 max-w-xl ${muted}`}>
            Review your order, apply an offer from our{" "}
            <Link to="/offers" className="font-semibold underline-offset-2 hover:underline" style={{ color: colors.primary }}>
              Offers
            </Link>{" "}
            page, choose an offer, then click <span className="font-semibold">Apply offer</span> before paying. Your card details stay in this session only (demo).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <section className={`${panelClass} p-6 md:p-8`}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className={`text-lg font-semibold ${heading}`}>Payment method</h2>
                <div className={`flex items-center gap-2 text-xs ${muted}`}>
                  <FaShieldAlt className="text-emerald-500" aria-hidden />
                  <span>256-bit encryption (simulated)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setSelectedPayment("card")}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPayment === "card" ? "shadow-md" : "opacity-90 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: selectedPayment === "card" ? colors.primary : isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
                    backgroundColor:
                      selectedPayment === "card"
                        ? isDarkMode
                          ? `${colors.primary}18`
                          : `${colors.primary}12`
                        : "transparent",
                  }}
                >
                  <FaCreditCard className="text-xl shrink-0" style={{ color: colors.primary }} />
                  <div>
                    <div className={`font-semibold text-sm ${heading}`}>Card</div>
                    <div className={`text-xs ${muted}`}>Visa, Mastercard, Amex</div>
                  </div>
                  <div className={`ml-auto flex gap-1.5 text-[10px] font-bold tracking-tighter ${muted}`}>
                    <span className="opacity-80">VISA</span>
                    <span className="opacity-50">·</span>
                    <span className="opacity-80">MC</span>
                  </div>
                </button>
              </div>

              {error && (
                <div
                  className="mb-6 p-4 rounded-xl border text-sm"
                  style={{
                    background: isDarkMode ? "rgba(239,68,68,0.12)" : "#fef2f2",
                    borderColor: isDarkMode ? "rgba(239,68,68,0.35)" : "#fecaca",
                    color: isDarkMode ? "#fecaca" : "#991b1b",
                  }}
                  role="alert"
                >
                  {error}
                </div>
              )}

              {selectedPayment === "card" && (
                <form onSubmit={handlePayClick} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="cardNumber">
                        Card number
                      </label>
                      <input
                        id="cardNumber"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardGroups(e.target.value))}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="cardName">
                        Name on card
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        autoComplete="cc-name"
                        placeholder="As printed on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="expiry">
                          Expires
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="cvv">
                          CVC
                        </label>
                        <input
                          id="cvv"
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="•••"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-semibold text-[15px] tracking-wide shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
                    style={{ backgroundColor: colors.primary, boxShadow: `0 12px 40px -12px ${colors.primary}88` }}
                  >
                    {loading ? (
                      "Processing…"
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2">
                        <FaLock className="text-sm opacity-90" />
                        Pay ${totalDue.toFixed(2)}
                      </span>
                    )}
                  </button>
                </form>
              )}
            </section>

            <p className={`text-xs text-center flex items-center justify-center gap-2 ${muted}`}>
              <FaLock className="shrink-0 text-emerald-500/90" aria-hidden />
              Demo checkout — no real charges. Data is not stored.
            </p>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <div className={`${panelClass} overflow-hidden`}>
              <div
                className="px-6 py-4 border-b flex items-center gap-2"
                style={{
                  borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                }}
              >
                <FaTag style={{ color: colors.primary }} aria-hidden />
                <h2 className={`text-base font-semibold ${heading}`}>Order summary</h2>
              </div>

              <div className="p-6 space-y-5">
                {ticketData?.movie?.title && (
                  <div>
                    <p className={`text-xs uppercase tracking-wide font-semibold ${muted}`}>Movie</p>
                    <p className={`font-medium ${heading}`}>{ticketData.movie.title}</p>
                    {ticketData?.showtime && (
                      <p className={`text-sm mt-1 ${muted}`}>
                        {typeof ticketData.showtime === "string"
                          ? ticketData.showtime
                          : ticketData.showtime?.label || ticketData.showtime?.time || ""}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className={muted}>
                      Tickets ({seatCount} {seatCount === 1 ? "seat" : "seats"})
                    </span>
                    <span className={`font-medium tabular-nums ${heading}`}>${ticketsTotal.toFixed(2)}</span>
                  </div>
                  {snacksTotal > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className={muted}>Snacks & drinks</span>
                      <span className={`font-medium tabular-nums ${heading}`}>${snacksTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div
                    className="flex justify-between gap-4 pt-3 border-t text-[15px]"
                    style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                  >
                    <span className={`font-semibold ${heading}`}>Subtotal</span>
                    <span className={`font-semibold tabular-nums ${heading}`}>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    background: isDarkMode ? "rgba(255,255,255,0.04)" : `${colors.primary}0a`,
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : `${colors.primary}22`}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <label className={`text-sm font-semibold ${heading}`} htmlFor="promo-select">
                      Offer / promo
                    </label>
                    <Link
                      to="/offers"
                      className="text-xs font-semibold whitespace-nowrap hover:underline"
                      style={{ color: colors.primary }}
                    >
                      View all offers
                    </Link>
                  </div>
                  <select
                    id="promo-select"
                    value={promoSelect}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPromoSelect(v);
                      setPromoManual(v);
                      setPromoApplyError("");
                      if (!v) setAppliedCode("");
                    }}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm ${inputClass}`}
                  >
                    {CHECKOUT_PROMO_OPTIONS.map((o) => (
                      <option key={o.code || "none"} value={o.code}>
                        {o.code ? `${o.label} (${o.code})` : o.label}
                      </option>
                    ))}
                  </select>
                  <div>
                    <label className={`text-xs ${muted} mb-1.5 block`} htmlFor="promo-manual">
                      Promo code (filled when you pick an offer above)
                    </label>
                    <input
                      id="promo-manual"
                      type="text"
                      placeholder="e.g. FRIENDS20"
                      value={promoManual}
                      onChange={(e) => {
                        setPromoManual(e.target.value);
                        syncSelectFromManual(e.target.value);
                        setPromoApplyError("");
                      }}
                      className={`${inputClass} py-2.5 text-sm font-mono uppercase`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                      isDarkMode
                        ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                        : "border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
                    }`}
                    style={{ outlineColor: colors.primary }}
                  >
                    Apply offer
                  </button>
                  {promoApplyError && (
                    <p className="text-sm text-red-600 dark:text-red-400">{promoApplyError}</p>
                  )}
                  {appliedCode && promoResult.ok && discount > 0 && (
                    <div className="flex items-start gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <FaCheck className="mt-0.5 shrink-0" aria-hidden />
                      <span>
                        Applied: {promoResult.appliedLabel}
                        <span className="font-semibold"> · −${discount.toFixed(2)}</span>
                      </span>
                    </div>
                  )}
                  {appliedCode && promoResult.ok && discount === 0 && (
                    <div className="flex items-start gap-2 text-sm text-emerald-600/90 dark:text-emerald-400/90">
                      <FaCheck className="mt-0.5 shrink-0" aria-hidden />
                      <span>Code applied (no discount on this basket).</span>
                    </div>
                  )}
                </div>

                <div
                  className="rounded-xl p-5 flex justify-between items-center gap-4"
                  style={{
                    background: isDarkMode ? `${colors.primary}14` : `${colors.primary}10`,
                  }}
                >
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wide ${muted}`}>Total due</p>
                    {discount > 0 && (
                      <p className={`text-xs mt-1 ${muted}`}>
                        You save <span className="font-semibold text-emerald-600 dark:text-emerald-400">${discount.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                  <p className="text-2xl font-bold tabular-nums" style={{ color: colors.primary }}>
                    ${totalDue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
