import BottomPanel from "../../Components/SnacksComponents/BottomPanelSnacks";
import Cards from "../../Components/SnacksComponents/CardsSnacks";
import FrontPanel from "../../Components/SnacksComponents/FrontPanelSnacks";
import { useState, useEffect } from "react";
import { useBooking } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";

const Snacks = () => {
  const { ticketData, setBookingSnacksData } = useBooking();
  const { isDarkMode, colors } = useTheme();

  const [stocks, setStocks] = useState([
    {
      id: 1,
      category: "Snacks",
      name: "Classic Popcorn",
      description: "Freshly popped butter popcorn",
      price: 8,
      image: "/movie-theatre-popcorn.jpg",
      item: 0,
    },
    {
      id: 2,
      category: "Snacks",
      name: "Caramel Popcorn",
      description: "Freshly Salted Caramel popped popcorn",
      price: 10,
      image: "/img_5412.jpg",
      item: 0,
    },
    {
      id: 3,
      category: "Drinks",
      name: "Coke",
      description: "Refreshing cold Coke",
      price: 5,
      image: "/drink-less-soda.jpg",
      item: 0,
    },
    {
      id: 4,
      category: "Food",
      name: "Grand Nachos",
      description: "Crispy, cheesy nacho during the next film",
      price: 15,
      image: "/20210224_Talabat_UAE_637505504022079539.jpg",
      item: 0,
    },
    {
      id: 5,
      category: "Drinks",
      name: "Raspberry Lemonade",
      description: "Refreshing blend of lemon, raspberries and ice",
      price: 10,
      image: "/frozen-raspberry-lemonade-2.jpg",
      item: 0,
    },
    {
      id: 6,
      category: "Food",
      name: "French Fries",
      description: "Crispy, perfectly salted french fries",
      price: 8,
      image: "/Ninja-Foodi-French-Fries7.jpg",
      item: 0,
    },
    {
      id: 7,
      category: "Snacks",
      name: "Chocolate Ice Cream",
      description: "Rich cocoa powder and a hint of vanilla",
      price: 5,
      image: "/recipe-for-honey-chocolate-ice-cream.jpg",
      item: 0,
    },
    {
      id: 8,
      category: "Food",
      name: "Sandwiches",
      description: "Baguette with ham, tomatoes and lettuce",
      price: 20,
      image: "/kanapki.jpg",
      item: 0,
    },
  ]);

  // حفظ بيانات الوجبات في Context عند تغييرها
  useEffect(() => {
    setBookingSnacksData(stocks);
  }, [stocks, setBookingSnacksData]);

  const increase = (id) => {
    const result = stocks.map((obj) =>
      obj.id === id ? { ...obj, item: (obj.item || 0) + 1 } : obj
    );
    setStocks(result);
  };

  const decrease = (id) => {
    const result = stocks.map((obj) =>
      obj.id === id ? { ...obj, item: obj.item > 0 ? obj.item - 1 : 0 } : obj
    );
    setStocks(result);
  };

  const subtotal = () => {
    let sum = 0;
    for (const obj of stocks) {
      const itemCount = obj.item || 0;
      sum += obj.price * itemCount;
    }
    return sum;
  };

  const totalItems = () => {
    let total = 0;
    for (const obj of stocks) {
      total += obj.item;
    }
    return total;
  };

  const snacksTotal = subtotal();
  const ticketsTotal = ticketData?.ticketPrice || 0;
  const grandTotal = snacksTotal + ticketsTotal;

  return (
    <div>
      <FrontPanel />
      <div className="mx-4 md:m-8">
        {/* عرض بيانات الحجز إذا كانت موجودة */}
        {ticketData && (
          <div
            className={`mb-4 md:mb-6 p-4 md:p-6 rounded-lg border transition-colors duration-300 ${
              isDarkMode
                ? "bg-[#111111] border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Your Booking Summary
            </h3>
            <div
              className={`space-y-2 text-xs md:text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <div className="flex justify-between">
                <span>Movie:</span>
                <span className="font-semibold">
                  {ticketData.movie?.title || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cinema:</span>
                <span className="font-semibold">
                  {ticketData.cinema?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Showtime:</span>
                <span className="font-semibold">
                  {ticketData.showtime?.time || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Seats:</span>
                <span className="font-semibold break-all">
                  {ticketData.seats?.join(", ") || "N/A"}
                </span>
              </div>
              <div
                className="flex justify-between border-t pt-2 mt-2"
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              >
                <span className="font-semibold">Tickets Total:</span>
                <span
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  ${ticketsTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <Cards
          stocks={stocks}
          increase={increase}
          decrease={decrease}
          subtotal={subtotal}
          totalItems={totalItems}
        />
        <BottomPanel
          subtotal={snacksTotal}
          totalItems={totalItems()}
          ticketsTotal={ticketsTotal}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
};

export default Snacks;
