import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";

const Booking = () => {
  const { isDarkMode, colors } = useTheme();
  const { ticketData, snacksData, getSnacksTotal, getGrandTotal } =
    useBooking();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const bookingData = ticketData || {
    movie: { title: "N/A" },
    cinema: { name: "N/A" },
    showtime: { time: "N/A", date: "" },
    seats: [],
    seatType: { type: "N/A" },
    ticketPrice: 0,
  };

  const snacksTotal = getSnacksTotal();
  const ticketsTotal = bookingData.ticketPrice || 0;
  const grandTotal = getGrandTotal();

  const steps = ["Showtime", "Cinema", "Seats", "Confirm"];

  return (
    <div
      className={`min-h-screen py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 md:px-10 max-w-4xl">
        <div className="mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? "text-blue-500" : ""
            }`}
            style={!isDarkMode ? { color: colors.primary } : {}}
          >
            Book Your Tickets
          </h1>

          <div
            className={`rounded-lg p-4 mb-8 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900 border-white/5"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const isConfirm = index === steps.length - 1;
                return (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <span
                        className={`text-sm font-semibold transition ${
                          isConfirm
                            ? "text-white bg-gray-800 px-4 py-2 rounded"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`rounded-lg border shadow-2xl overflow-hidden mb-8 transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#111111] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-8">
            <h2
              className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Booking Summary
            </h2>

            {/* Booking Details */}
            <div
              className={`space-y-4 p-6 rounded-lg mb-6 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Movie:
                </span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bookingData.movie?.title || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Cinema:
                </span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bookingData.cinema?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Showtime:
                </span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bookingData.showtime?.time || "N/A"}
                  {bookingData.showtime?.date &&
                    ` - ${bookingData.showtime.date}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Seats:
                </span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bookingData.seats?.length > 0
                    ? bookingData.seats.join(", ")
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Seat Type:
                </span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {bookingData.seatType?.type || "N/A"}
                </span>
              </div>

              {snacksData && snacksData.length > 0 && (
                <>
                  <div
                    className={`border-t pt-4 mt-4 transition-colors duration-300 ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Food & Drinks
                    </h3>
                    <div className="space-y-2">
                      {snacksData.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span
                            className={
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }
                          >
                            {item.name} x{item.item}
                          </span>
                          <span
                            className={`font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            ${(item.price * item.item).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div
                className={`border-t pt-4 mt-4 transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Tickets:
                  </span>
                  <span
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${ticketsTotal.toFixed(2)}
                  </span>
                </div>
                {snacksTotal > 0 && (
                  <div className="flex justify-between mb-2">
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Food & Drinks:
                    </span>
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${snacksTotal.toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex justify-between pt-2 border-t ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <span
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-blue-500" : ""
                    }`}
                    style={!isDarkMode ? { color: colors.primary } : {}}
                  >
                    Grand Total:
                  </span>
                  <span
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-blue-500" : ""
                    }`}
                    style={!isDarkMode ? { color: colors.primary } : {}}
                  >
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (!isAuthenticated || !user) {
                    navigate("/login", {
                      state: { from: { pathname: "/booking" } },
                    });
                  } else {
                    alert(
                      "Booking confirmed! Your tickets have been sent to your email."
                    );
                  }
                }}
                className={`w-full px-6 py-4 rounded-xl text-white font-semibold transition-all ${
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                }`}
                style={!isDarkMode ? { backgroundColor: colors.primary } : {}}
                onMouseEnter={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                  } else {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.border = `2px solid ${colors.primary}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                  } else {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                  }
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
