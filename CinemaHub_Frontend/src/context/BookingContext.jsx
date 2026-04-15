import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [ticketData, setTicketData] = useState(null);

  const [snacksData, setSnacksData] = useState([]);

  const setBookingTicketData = (data) => {
    setTicketData({
      movie: data.movieData,
      cinema: data.cinemaLocation,
      showtime: data.showtime,
      seats: data.selectedSeats,
      seatType: data.seatType,
      ticketPrice: data.totalPrice,
      cinemaType: data.cinemaType,
      seatPrices: data.seatPrices || {},
    });
  };

  const setBookingSnacksData = (snacks) => {
    setSnacksData(snacks.filter((item) => item.item > 0)); // فقط الوجبات التي تم اختيارها
  };

  const getSnacksTotal = () => {
    return snacksData.reduce((total, item) => {
      return total + item.price * item.item;
    }, 0);
  };

  const getGrandTotal = () => {
    const ticketsTotal = ticketData?.ticketPrice || 0;
    const snacksTotal = getSnacksTotal();
    return ticketsTotal + snacksTotal;
  };

  const clearBookingData = () => {
    setTicketData(null);
    setSnacksData([]);
  };

  const value = {
    ticketData,
    snacksData,
    setBookingTicketData,
    setBookingSnacksData,
    getSnacksTotal,
    getGrandTotal,
    clearBookingData,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
