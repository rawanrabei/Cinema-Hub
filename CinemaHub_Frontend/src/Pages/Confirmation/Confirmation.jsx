import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import Footer from "../../Components/Footer/Footer";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const Confirmation = () => {
  const { isDarkMode, colors } = useTheme();
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const ticketsTotal = bookingData?.ticketsTotal || 0;
    const snacksTotal = bookingData?.snacksTotal || 0;
    return ticketsTotal + snacksTotal;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundColor: `${colors.primary}20` }}>
            <FaCheckCircle className="text-5xl" style={{ color: colors.primary }} />
          </div>
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Booking Confirmed!
          </h1>
          <p className={`text-lg transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your tickets have been successfully booked. Check your email for confirmation.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className={`rounded-xl p-8 transition-colors duration-300 ${isDarkMode ? "bg-[#111111] border border-white/10" : "bg-white border border-gray-200"}`}>
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-[#FF0800]"}`}>
            Booking Summary
          </h2>

         

          {/* Ticket Details */}
          <div className="mb-6 pb-6 border-b" style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
            <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
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
          <div className="flex justify-between items-center mb-8">
            <span className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Total Amount
            </span>
            <span className={`text-3xl font-bold transition-colors duration-300`} style={{ color: colors.primary }}>
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/home")}
            className="w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
            <FaHome />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmation;
