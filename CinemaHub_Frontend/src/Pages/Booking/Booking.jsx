import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:18080";

const Booking = () => {
  const { isDarkMode, colors } = useTheme();
  const { ticketData, snacksData, getSnacksTotal, getGrandTotal } =
    useBooking();
  const { isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingData = ticketData || {
    movie: { title: "N/A", id: null },
    cinema: { name: "N/A" },
    showtime: { time: "N/A", date: "", id: null },
    seats: [],
    seatType: { type: "N/A" },
    ticketPrice: 0,
  };

  const snacksTotal = getSnacksTotal();
  const ticketsTotal = bookingData.ticketPrice || 0;
  const grandTotal = getGrandTotal();

  const steps = ["Showtime", "Cinema", "Seats", "Confirm"];

  const handleConfirmBooking = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login", {
        state: { from: { pathname: "/booking" } },
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch user profile to get numeric ID if current user.id is not a number
      let userId = user.id;
      if (typeof userId === 'string' && isNaN(parseInt(userId))) {
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

      // Validate required booking data
      if (!bookingData.showtime?.id || !bookingData.movie?.id || !bookingData.seats || bookingData.seats.length === 0) {
        setError("Missing booking information. Please select a movie and go through the booking flow to choose showtime and seats.");
        setLoading(false);
        return;
      }

      // Generate seats for the showtime before booking
      try {
        const generateResponse = await fetch(`${API_BASE_URL}/api/bookings/generate-seats/${bookingData.showtime.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Continue even if seat generation fails - backend will handle it
      } catch (genError) {
        console.warn("Seat generation failed, continuing with booking:", genError);
      }

      const bookingRequest = {
        userId: userId,
        showtimeId: bookingData.showtime.id,
        movieId: bookingData.movie.id,
        seatNumbers: bookingData.seats,
      };

      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Booking failed:", errorText);
        throw new Error(errorText || "Booking failed. Please try again.");
      }

      const booking = await response.json();
      navigate("/payment", { state: { bookingId: booking.bookingId, amount: grandTotal } });
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {!ticketData && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                No booking data found. Please select a movie and complete the booking flow first.
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleConfirmBooking}
                disabled={loading || !ticketData}
                className={`w-full px-6 py-4 rounded-xl text-white font-semibold transition-all ${
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                } ${!ticketData ? "opacity-50 cursor-not-allowed" : ""}`}
                style={!isDarkMode && ticketData ? { backgroundColor: colors.primary } : {}}
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
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
