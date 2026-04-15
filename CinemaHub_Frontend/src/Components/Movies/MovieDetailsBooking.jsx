import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  Stepper,
  Step,
  Radio,
} from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaChair,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";

const DUMMY_SHOWTIMES = [
  { id: 1, time: "1:30 PM", seats: 55, date: "October 15, 2025" },
  { id: 2, time: "4:00 PM", seats: 70, date: "October 15, 2025" },
  { id: 3, time: "6:30 PM", seats: 80, date: "October 15, 2025" },
  { id: 4, time: "9:00 PM", seats: 40, date: "October 15, 2025" },
];

const DUMMY_CINEMAS = [
  {
    id: 1,
    name: "Luxury Cinema Mall",
    address: "456 Shopping Blvd, Mall District", 
    image: "/images/cinemas/mall_view.jpg",
    features: ["VIP Lounge", "Recliner Seats", "Air Conditioning"],
  },
  {
    id: 2,
    name: "Grand Cinema Downtown",
    address: "123 Main Street, Downtown",
    image: "/images/cinemas/downtown_view.jpg",
    features: ["IMAX", "Dolby Atmos", "Standard"],
  },
  {
    id: 3,
    name: "Family Cinema Center",
    address: "789 Family Ave, Suburbia",
    image: "/images/cinemas/family_view.jpg",
    features: ["Kids Zone", "Standard", "Air Conditioning"],
  },
  {
    id: 4,
    name: "Downtown Movieplex",
    address: "321 Park Lane, Greenfield",
    image: "/images/cinemas/openair_view.jpg",
    features: ["Open Air", "Standard Seating", "No Air Conditioning"],
  },
  
];

const DUMMY_SEAT_TYPES = [
  { type: "Standard Seat", price: 12 },
  { type: "VIP Seat", price: 18 },
  { type: "Recliner Seat", price: 25 },
];

const ShowtimeStep = ({ data, setData, onNext }) => {
  const { isDarkMode, colors } = useTheme();

  const handleCinemaTypeChange = (type) => {
    setData((prev) => ({ ...prev, cinemaType: type }));
  };
  const handleShowtimeSelect = (showtime) => {
    setData((prev) => ({ ...prev, showtime: showtime }));

    setTimeout(() => {
      if (onNext) onNext();
    }, 300);
  };

  return (
    <div className="text-white">
      <Typography className="mb-4 text-lg md:text-xl font-semibold" color="white">
        Select Cinema Type
      </Typography>

      <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
        {["With Air Conditioning", "Without Air Conditioning"].map((type) => (
          <div key={type} className="flex items-center">
            <input
              type="radio"
              id={type}
              name="cinemaType"
              checked={data.cinemaType === type}
              onChange={() => handleCinemaTypeChange(type)}
              className={`w-4 h-4 bg-black border-gray-600 ${
                isDarkMode ? 'text-blue-600 focus:ring-blue-600' : 'text-[#FF0800] focus:ring-[#FF0800]'
              }`}
            />
            <label htmlFor={type} className="ml-2 text-white text-sm md:text-base">
              {type}
            </label>
          </div>
        ))}
      </div>

      <Typography className="mb-4 text-lg md:text-xl font-semibold" color="white">
        Available Showtimes - {DUMMY_SHOWTIMES[0].date}
      </Typography>

      <div className="flex flex-wrap gap-3 md:gap-4">
        {DUMMY_SHOWTIMES.map((st) => {
          const isSelected = data.showtime?.id === st.id;

          const buttonClasses = isSelected
            ? isDarkMode
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-[#FF0800] text-white border-[#FF0800]"
            : "bg-gray-900 text-white border border-gray-700";

          return (
            <Button
              key={st.id}
              onClick={() => handleShowtimeSelect(st)}
              className={`py-2 md:py-1 px-8 md:px-48 text-center shadow-lg ${buttonClasses} text-xs md:text-sm`}
              style={isSelected && !isDarkMode ? { backgroundColor: colors.primary, borderColor: colors.primary } : {}}
            >
              <div className="flex flex-col items-center space-y-0">
                <Typography className="text-xs md:text-sm font-semibold leading-tight">
                  {st.time}
                </Typography>
                <Typography className="text-[10px] md:text-xs font-normal leading-tight">
                  {st.seats} seats
                </Typography>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const CinemaStep = ({ data, setData, onNext }) => {
  const { isDarkMode, colors } = useTheme();

  const handleCinemaSelect = (cinema) => {
    setData((prev) => ({ ...prev, cinemaLocation: cinema }));

    setTimeout(() => {
      if (onNext) onNext();
    }, 300);
  };

  return (
    <div className="text-white">
      <Typography variant="h4" className="mb-4 md:mb-6 font-semibold text-lg md:text-xl" color="white">
        Select Cinema Location
      </Typography>

      <div className="flex flex-col gap-3 md:gap-4">
        {DUMMY_CINEMAS.map((cinema) => {
          const isSelected = data.cinemaLocation?.id === cinema.id;
          const cardClasses = isSelected
            ? isDarkMode
              ? "border-blue-600 border-2 bg-gray-900"
              : "border-[#FF0800] border-2 bg-gray-900"
            : isDarkMode
            ? "border border-gray-700 bg-gray-900 hover:border-blue-600/50"
            : "border border-gray-700 bg-gray-900 hover:border-[#FF0800]/50";

          return (
            <Card
              key={cinema.id}
              className={`p-3 md:p-4 cursor-pointer transition-all duration-300 ${cardClasses}`}
              onClick={() => handleCinemaSelect(cinema)}
            >
              <div>
                <Typography variant="h6" color="white" className="mb-1 text-sm md:text-base">
                  {cinema.name}
                </Typography>
                <div className="flex items-center text-gray-400 text-xs md:text-sm mb-2 md:mb-3">
                  <FaMapMarkerAlt className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {cinema.address}
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {cinema.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-[10px] md:text-xs px-2 py-1 bg-gray-700 text-white rounded-md"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const SeatSelectionStep = ({ data, setData, onNext }) => {
  const { isDarkMode, colors } = useTheme();

  const getSeatPrice = (seatId, basePrice) => {
    const row = seatId.charAt(0);
    const rowIndex = row.charCodeAt(0) - "A".charCodeAt(0);

    let priceMultiplier = 1;
    if (rowIndex <= 1) {
      priceMultiplier = 0.85;
    } else if (rowIndex <= 3) {
      priceMultiplier = 1;
    } else if (rowIndex <= 5) {
      priceMultiplier = 1.15;
    } else {
      // G, H
      priceMultiplier = 1.3;
    }

    return Math.round(basePrice * priceMultiplier);
  };

  const handleSeatTypeSelect = (seatType) => {
    let newTotal = 0;
    if (data.selectedSeats.length > 0) {
      newTotal = data.selectedSeats.reduce((sum, seatId) => {
        return sum + getSeatPrice(seatId, seatType.price);
      }, 0);
    }

    setData((prev) => ({
      ...prev,
      seatType: seatType,
      totalPrice: newTotal,
      seatPrices: prev.selectedSeats.reduce((acc, seatId) => {
        acc[seatId] = getSeatPrice(seatId, seatType.price);
        return acc;
      }, {}),
    }));
  };

  const isSeatTypeSelected = data.seatType !== null;
  const hasSelectedSeats = data.selectedSeats.length > 0;
  const canContinue = isSeatTypeSelected && hasSelectedSeats;

  const SEAT_MAP = [
    { row: "A", seats: 12 },
    { row: "B", seats: 12 },
    { row: "C", seats: 12 },
    { row: "D", seats: 12 },
    { row: "E", seats: 12 },
    { row: "F", seats: 12 },
    { row: "G", seats: 12 },
    { row: "H", seats: 12 },
  ];
  const occupiedSeats = [
    "A4",
    "A5",
    "B3",
    "B7",
    "C6",
    "D4",
    "E2",
    "E7",
    "F9",
    "G4",
    "H3",
  ];

  const toggleSeat = (seatId) => {
    if (!isSeatTypeSelected) return;

    const isSelected = data.selectedSeats.includes(seatId);
    let newSeats;

    if (isSelected) {
      newSeats = data.selectedSeats.filter((id) => id !== seatId);
    } else {
      newSeats = [...data.selectedSeats, seatId];
    }

    let newTotal = 0;
    const seatPrices = {};
    newSeats.forEach((seatId) => {
      const seatPrice = getSeatPrice(seatId, data.seatType.price);
      seatPrices[seatId] = seatPrice;
      newTotal += seatPrice;
    });

    setData((prev) => ({
      ...prev,
      selectedSeats: newSeats,
      totalPrice: newTotal,
      seatPrices: seatPrices,
    }));
  };

  return (
    <div className="text-white">
      <Typography variant="h4" className="mb-4 md:mb-6 font-semibold text-lg md:text-xl" color="white">
        Select Seat Type
      </Typography>

      <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
        {DUMMY_SEAT_TYPES.map((seat) => {
          const isSelected = data.seatType?.type === seat.type;
          const cardClasses = isSelected
            ? isDarkMode
              ? "border-blue-600 border-2"
              : "border-[#FF0800] border-2"
            : "border border-gray-700";

          return (
            <Card
              key={seat.type}
              className={`p-3 md:p-4 cursor-pointer bg-gray-900 transition-all ${cardClasses}`}
              onClick={() => handleSeatTypeSelect(seat)}
            >
              <div className="flex items-center">
                <Radio
                  name="seatType"
                  checked={isSelected}
                  readOnly
                  className={`h-4 w-4 bg-black border-gray-600 ${
                    isDarkMode ? 'text-blue-600 focus:ring-blue-600' : 'text-[#FF0800] focus:ring-[#FF0800]'
                  }`}
                />
                <Typography
                  variant="h6"
                  className="ml-2 font-medium text-sm md:text-base"
                  color="white"
                >
                  {seat.type}:{" "}
                  <span className="font-normal">${seat.price} per seat</span>
                </Typography>
              </div>
            </Card>
          );
        })}
      </div>

      <Typography variant="h4" className="mb-4 md:mb-6 font-semibold text-lg md:text-xl" color="white">
        Select Your Seats
      </Typography>

      <div className="flex flex-col items-center">
        <div className="w-3/4 md:w-2/3 bg-gray-700 text-center py-2 mb-6 md:mb-8 rounded-t-lg text-xs md:text-sm">
          Screen
        </div>

        <div className="space-y-2 md:space-y-3 bg-[#0f0f0f] p-3 md:p-6 rounded-2xl border border-white/5 shadow-inner w-full overflow-x-auto">
          {SEAT_MAP.map((rowInfo) => (
            <div
              key={rowInfo.row}
              className="flex items-center gap-1 md:gap-2 justify-center min-w-max"
            >
              <span className="w-5 md:w-6 text-center font-bold text-gray-400 text-xs md:text-sm">
                {rowInfo.row}
              </span>
              {[...Array(rowInfo.seats)].map((_, seatIndex) => {
                const seatId = rowInfo.row + (seatIndex + 1);
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = data.selectedSeats.includes(seatId);

                const seatClasses = isOccupied
                  ? "bg-gradient-to-br from-[#3b0202] to-[#6b0f0f] text-white cursor-not-allowed"
                  : isSelected
                  ? isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg cursor-pointer"
                    : "bg-gradient-to-br from-[#FF0800] to-[#CC0600] text-white shadow-lg cursor-pointer"
                  : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2b2b2b] cursor-pointer";

                return (
                  <div
                    key={seatId}
                    onClick={() => {
                      if (!isOccupied && isSeatTypeSelected) {
                        toggleSeat(seatId);
                      }
                    }}
                    className={`w-5 h-5 md:w-7 md:h-7 text-[10px] md:text-xs flex items-center justify-center rounded-t-xl border-b-4 border-black/40 transition ${seatClasses}`}
                  >
                    {seatIndex + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-[#1f1f1f] border border-white/10"></div>
            <Typography variant="small" color="white" className="text-xs md:text-sm">
              Available
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-sm ${
              isDarkMode
                ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                : 'bg-gradient-to-br from-[#FF0800] to-[#CC0600]'
            }`}></div>
            <Typography variant="small" color="white" className="text-xs md:text-sm">
              Selected
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-gradient-to-br from-[#3b0202] to-[#6b0f0f]"></div>
            <Typography variant="small" color="white" className="text-xs md:text-sm">
              Occupied
            </Typography>
          </div>
        </div>
      </div>

      {isSeatTypeSelected && hasSelectedSeats && (
        <div className={`mt-4 md:mt-6 p-3 md:p-4 bg-gray-900 rounded-lg border ${
          isDarkMode ? 'border-blue-600/30' : 'border-[#FF0800]/30'
        }`}>
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white" className="font-semibold text-sm md:text-base">
              Total Price:
            </Typography>
            <Typography
              variant="h5"
              className="font-bold text-sm md:text-base"
              style={{ color: colors.primary }}
            >
              ${data.totalPrice.toFixed(2)}
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="mt-2 text-xs md:text-sm">
            {data.selectedSeats.length} seat(s) selected • Base price: $
            {data.seatType?.price}/seat
          </Typography>
        </div>
      )}

      <div className="mt-4 md:mt-6">
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
            canContinue
              ? isDarkMode
                ? "bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 hover:border-2 hover:border-blue-600"
                : "bg-[#FF0800] text-white hover:bg-transparent hover:text-[#FF0800] hover:border-2 hover:border-[#FF0800]"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          style={canContinue && !isDarkMode ? { backgroundColor: colors.primary } : {}}
          onMouseEnter={(e) => {
            if (canContinue) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.primary;
              e.currentTarget.style.border = `2px solid ${colors.primary}`;
            }
          }}
          onMouseLeave={(e) => {
            if (canContinue) {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.border = "none";
            }
          }}
        >
          {!isSeatTypeSelected
            ? "Please select a seat type first"
            : !hasSelectedSeats
            ? "Please select at least one seat"
            : "Continue to Summary"}
        </Button>
      </div>
    </div>
  );
};

const SummaryStep = ({ data }) => {
  const { setBookingTicketData } = useBooking();
  const { isDarkMode, colors } = useTheme();
  const navigate = useNavigate();

  const seatList =
    data.selectedSeats.length > 0
      ? data.selectedSeats.join(", ")
      : "None Selected";

  const handleContinueToSnacks = () => {
    setBookingTicketData(data);
    navigate("/snacks");
  };

  return (
    <div className="text-white">
      <Typography variant="h4" className="mb-4 md:mb-6 font-semibold text-lg md:text-xl" color="white">
        Booking Summary
      </Typography>

      <div className="space-y-3 md:space-y-4 bg-gray-900 p-4 md:p-6 rounded-lg">
        <div className="flex justify-between">
          <Typography color="gray" className="text-sm md:text-base">Movie:</Typography>
          <Typography color="white" className="font-semibold text-sm md:text-base">
            {data.movieData?.title || "N/A"}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography color="gray" className="text-sm md:text-base">Cinema:</Typography>
          <Typography color="white" className="font-semibold text-sm md:text-base">
            {data.cinemaLocation?.name || "N/A"}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography color="gray" className="text-sm md:text-base">Showtime:</Typography>
          <Typography color="white" className="font-semibold text-sm md:text-base">
            {data.showtime?.time || "N/A"}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography color="gray" className="text-sm md:text-base">Seat Type:</Typography>
          <Typography color="white" className="font-semibold text-sm md:text-base">
            {data.seatType?.type || "Standard"}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography color="gray" className="text-sm md:text-base">Seats:</Typography>
          <Typography color="white" className="font-semibold text-sm md:text-base break-all">
            {seatList}
          </Typography>
        </div>

        {data.selectedSeats?.length > 0 && data.seatPrices && (
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700">
            <Typography color="gray" className="mb-2 text-sm md:text-base">
              Seat Details:
            </Typography>
            <div className="space-y-1">
              {data.selectedSeats.map((seatId) => (
                <div key={seatId} className="flex justify-between text-xs md:text-sm">
                  <Typography color="gray">Seat {seatId}:</Typography>
                  <Typography color="white" className="font-semibold">
                    $
                    {(
                      data.seatPrices[seatId] ||
                      data.seatType?.price ||
                      0
                    ).toFixed(2)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between border-t border-gray-700 pt-3 md:pt-4 mt-3 md:mt-4">
          <Typography
            variant="h5"
            className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-blue-500' : ''}`}
            style={!isDarkMode ? { color: "#FF0800" } : {}}
          >
            Total:
          </Typography>
          <Typography
            variant="h5"
            className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-blue-500' : ''}`}
            style={!isDarkMode ? { color: "#FF0800" } : {}}
          >
            ${data.totalPrice.toFixed(2)}
          </Typography>
        </div>
      </div>

      <div className="flex justify-center pt-4 md:pt-5">
        <button
          onClick={handleContinueToSnacks}
          className={`w-full py-2 md:py-3 rounded-xl text-white font-semibold transition text-sm md:text-base ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-transparent hover:text-blue-600 hover:border-2 hover:border-blue-600'
              : 'bg-[#FF0800] hover:bg-transparent hover:text-[#FF0800] hover:border-2 hover:border-[#FF0800]'
          }`}
        >
          Continue to Food & Drinks
        </button>
      </div>
    </div>
  );
};

const MovieDetailsBooking = ({ movieData }) => {
  const { isDarkMode, colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const [bookingData, setBookingData] = useState({
    cinemaType: "With Air Conditioning",
    showtime: null,
    cinemaLocation: null,
    seatType: null,
    selectedSeats: [],
    totalPrice: 0,
    seatPrices: {},
    movieData: movieData,
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getStepComponent = () => {
    const props = {
      data: bookingData,
      setData: setBookingData,
      onNext: handleNext,
      onPrev: handlePrev,
    };

    switch (currentStep) {
      case 0:
        return <ShowtimeStep {...props} />;
      case 1:
        return <CinemaStep {...props} />;
      case 2:
        return <SeatSelectionStep {...props} />;
      case 3:
        return <SummaryStep {...props} />;
      default:
        return <div>An error occurred in the booking process.</div>;
    }
  };

  return (
    <Card
      id="booking"
      className="bg-black shadow-2xl mx-4 md:ms-20 my-6 md:my-8 rounded-lg w-[calc(100%-2rem)] md:w-[90%] p-4 md:p-6"
    >
      <Typography
        variant="h3"
        className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-blue-500' : ''}`}
        style={!isDarkMode ? { color: "#FF0800" } : {}}
      >
        Book Your Tickets
      </Typography>

      <div className="w-full bg-gray-900 rounded-lg p-1">
        <div className="flex justify-between p-2">
          {["Showtime", "Cinema", "Seats", "Confirm"].map((label, index) => {
            const isCurrent = index === currentStep;
            return (
              <Typography
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`text-center font-semibold text-xs md:text-sm cursor-pointer ${
                  isCurrent ? "text-white" : "text-gray-500 hover:text-white"
                }`}
              >
                {label}
              </Typography>
            );
          })}
        </div>
      </div>

      <div className="mt-4 md:mt-6">{getStepComponent()}</div>
    </Card>
  );
};

export default MovieDetailsBooking;
