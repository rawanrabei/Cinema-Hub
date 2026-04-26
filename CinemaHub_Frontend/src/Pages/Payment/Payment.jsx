import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../Components/Footer/Footer";
import { FaCreditCard, FaArrowLeft } from "react-icons/fa";

const API_BASE_URL = "http://localhost:8080";

const Payment = () => {
  const { isDarkMode, colors } = useTheme();
  const { bookingData } = useBooking();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, amount } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const paymentRequest = {
        bookingId: bookingId || 1,
        userId: user?.id || 1,
        amount: amount || calculateTotal(),
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
      navigate("/confirmation", { state: { paymentId: payment.id, bookingId } });
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const ticketsTotal = bookingData?.ticketsTotal || 0;
    const snacksTotal = bookingData?.snacksTotal || 0;
    return ticketsTotal + snacksTotal;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 transition-colors duration-300 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl p-6 transition-colors duration-300 ${isDarkMode ? "bg-[#111111] border border-white/10" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Payment Method
              </h2>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setSelectedPayment("card")}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedPayment === "card"
                      ? "border-opacity-100"
                      : "border-opacity-30 hover:border-opacity-50"
                  }`}
                  style={{
                    borderColor: selectedPayment === "card" ? colors.primary : isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                    backgroundColor: selectedPayment === "card" ? `${colors.primary}20` : "transparent"
                  }}
                >
                  <FaCreditCard className={`text-xl ${selectedPayment === "card" ? "" : "text-gray-400"}`} style={{ color: selectedPayment === "card" ? colors.primary : "" }} />
                  <span className={`font-medium ${selectedPayment === "card" ? "" : isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Credit/Debit Card
                  </span>
                </button>

                
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {/* Card Details Form */}
              {selectedPayment === "card" && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400"
                      }`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400"
                        }`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: colors.primary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.border = `2px solid ${colors.primary}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.border = "none";
                    }}
                  >
                    {loading ? "Processing..." : `Pay $${(amount || calculateTotal()).toFixed(2)}`}
                  </button>
                </form>
              )}

              {selectedPayment !== "card" && (
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: colors.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.border = `2px solid ${colors.primary}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                  }}
                >
                  {loading ? "Processing..." : `Pay $${(amount || calculateTotal()).toFixed(2)}`}
                </button>
              )}

              {/* Security Notice */}
              <p className={`text-xs text-center mt-4 transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl p-6 transition-colors duration-300 ${isDarkMode ? "bg-[#111111] border border-white/10" : "bg-white border border-gray-200"}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Booking Summary
              </h2>


              {/* Ticket Details */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
                <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                  Tickets
                </h4>
                <div className="flex justify-between items-center">
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {bookingData?.seats?.length || 0}x Standard Ticket
                  </span>
                  <span className={`font-semibold transition-colors duration-300`} style={{ color: colors.primary }}>
                    ${bookingData?.ticketsTotal?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

             

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Total Amount
                </span>
                <span className={`text-2xl font-bold transition-colors duration-300`} style={{ color: colors.primary }}>
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
