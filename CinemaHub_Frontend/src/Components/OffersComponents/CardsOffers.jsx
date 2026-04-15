import { SlPeople } from "react-icons/sl";
import { IoCopyOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoGiftOutline } from "react-icons/io5";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const CardsOffers = () => {
  const { isDarkMode, colors } = useTheme();
  const [copiedCode, setCopiedCode] = useState("");
  const [activeButton, setActiveButton] = useState("All");

  const copy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 1200);
  };

  return (
    <div>
      <div
        className={`w-fit rounded-2xl m-7 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex gap-1 justify-evenly text-lg">
          <button
            onClick={() => setActiveButton("All")}
            className={`rounded-2xl px-4 phone:text-xs tablet:text-lg laptop:text-xl transition-all duration-300 ${
              activeButton === "All"
                ? "text-white shadow-lg"
                : isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={
              activeButton === "All" ? { backgroundColor: colors.primary } : {}
            }
          >
            All Offers
          </button>

          <button
            onClick={() => setActiveButton("FriendsAndGroups")}
            className={`rounded-2xl px-4 py-2 phone:text-xs tablet:text-lg laptop:text-xl transition-all duration-300 ${
              activeButton === "FriendsAndGroups"
                ? "text-white shadow-lg"
                : isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={
              activeButton === "FriendsAndGroups"
                ? { backgroundColor: colors.primary }
                : {}
            }
          >
            <SlPeople className="inline-block mb-1 mr-1" />
            Friends & Groups
          </button>

          <button
            onClick={() => setActiveButton("General")}
            className={`rounded-2xl px-4 py-2 phone:text-xs tablet:text-lg laptop:text-xl transition-all duration-300 ${
              activeButton === "General"
                ? "text-white shadow-lg"
                : isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={
              activeButton === "General"
                ? { backgroundColor: colors.primary }
                : {}
            }
          >
            <AiOutlinePercentage className="inline-block mb-1 mr-1" />
            General
          </button>

          <button
            onClick={() => setActiveButton("GiftCards")}
            className={`rounded-2xl px-4 py-2 phone:text-xs tablet:text-lg laptop:text-xl transition-all duration-300 ${
              activeButton === "GiftCards"
                ? "text-white shadow-lg"
                : isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={
              activeButton === "GiftCards"
                ? { backgroundColor: colors.primary }
                : {}
            }
          >
            <IoGiftOutline className="inline-block mb-1 mr-1" />
            Gift Cards
          </button>
        </div>
      </div>

      <div className="m-9 flex flex-col gap-10">
        {(activeButton === "All" || activeButton === "FriendsAndGroups") && (
          <>
            <h1
              className={`text-2xl transition-colors duration-300 text-gray-900`}
            >
              <SlPeople
                className="inline-block mr-1 mb-2 transition-colors duration-300"
                style={{ color: colors.primary }}
              />
              Friends & Group Deals
            </h1>
            <div className="flex gap-7 phone:flex-col tablet:flex-col laptop:flex-row">
              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">20% OFF</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <SlPeople
                      className="inline-block m-2 transition-colors duration-300"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 ">
                  <h1 className="text-white text-xl ">Friends Special</h1>
                  <p className="text-gray-400">
                    Buy 4 tickets, get 20% off on food & drinks
                  </p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">FRIENDS20</p>
                  <button onClick={() => copy("FRIENDS20")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      style={{
                        "--hover-color": colors.primary,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "FRIENDS20" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>

              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">15% OFF</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <SlPeople
                      className="inline-block transition-colors duration-300 m-2"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <h1 className="text-white text-xl">Group Deal</h1>
                  <p className="text-gray-400">
                    Book 6+ tickets and save 15% on total
                  </p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">GROUP15</p>
                  <button onClick={() => copy("GROUP15")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "GROUP15" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>
            </div>
          </>
        )}

        {(activeButton === "All" || activeButton === "General") && (
          <>
            <h1
              className={`text-2xl transition-colors duration-300 text-gray-900`}
            >
              <AiOutlinePercentage
                className="inline-block mr-1 mb-2 transition-colors duration-300"
                style={{ color: colors.primary }}
              />
              General Offers
            </h1>
            <div className="flex gap-7 phone:flex-col tablet:flex-col laptop:flex-row">
              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">40% COMBO</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <AiOutlinePercentage
                      className="inline-block transition-colors duration-300 m-2"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <h1 className="text-white text-xl">Weekend Special</h1>
                  <p className="text-gray-400">
                    Weekend shows - 2 tickets + 2 popcorns for $40
                  </p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">WEEKEND40</p>
                  <button onClick={() => copy("WEEKEND40")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "WEEKEND40" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>

              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">65% BUNDLE</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <AiOutlinePercentage
                      className="inline-block transition-colors duration-300 m-2"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <h1 className="text-white text-xl">Family Bundle</h1>
                  <p className="text-gray-400">
                    4 tickets + 2 large popcorns + 4 drinks = $65
                  </p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">FAMILY65</p>
                  <button onClick={() => copy("FAMILY65")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "FAMILY65" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>
            </div>
          </>
        )}

        {(activeButton === "All" || activeButton === "GiftCards") && (
          <>
            <h1
              className={`text-2xl transition-colors duration-300 text-gray-900`}
            >
              <IoGiftOutline
                className="inline-block mr-1 mb-2 transition-colors duration-300"
                style={{ color: colors.primary }}
              />
              Gift Cards
            </h1>
            <div className="flex gap-7 phone:flex-col tablet:flex-col laptop:flex-row">
              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">50% VALUE</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <IoGiftOutline
                      className="inline-block transition-colors duration-300 m-2"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <h1 className="text-white text-xl">Gift Card $50</h1>
                  <p className="text-gray-400">Perfect gift for movie lovers</p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">GIFT50</p>
                  <button onClick={() => copy("GIFT50")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "GIFT50" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>

              <div className="transition ease-in-out delay-100 hover:-translate-y-3 duration-300 bg-black w-96 rounded-lg p-5 phone:w-80 tablet:w-auto laptop:w-96">
                <div className="flex justify-between gap-5">
                  <div
                    className="p-1 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h1 className="text-white">100% VALUE</h1>
                  </div>
                  <div
                    className="rounded-full transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}30` }}
                  >
                    <IoGiftOutline
                      className="inline-block transition-colors duration-300 m-2"
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <h1 className="text-white text-xl">Gift Card $100</h1>
                  <p className="text-gray-400">
                    Premium gift card with bonus points
                  </p>
                </div>
                <div className="flex justify-between p-2 items-center mt-10 bg-gray-900 rounded-xl">
                  <p className="text-white">GIFT100</p>
                  <button onClick={() => copy("GIFT100")}>
                    <IoCopyOutline
                      className="inline-block text-white hover:bg-gray-800 w-7 h-7 p-1 rounded transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                    />
                    {copiedCode === "GIFT100" && (
                      <span
                        className="font-bold ml-2 transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1 flex">
                  <BsStars className="mr-1" /> Valid until October 31, 2026
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardsOffers;
