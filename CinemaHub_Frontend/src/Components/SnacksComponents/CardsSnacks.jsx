import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Cards = ({ stocks = [], increase, decrease }) => {
  const { isDarkMode, colors } = useTheme();
  const [category, setCategory] = useState("All");

  const showCards = stocks.filter((item) => {
    if (category === "All") return true;
    return item.category === category;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-0">
        <Button
          onClick={() => setCategory("All")}
          className={`border-2 transition-colors duration-300 text-xs sm:text-sm ${
            isDarkMode ? "border-white/20" : "border-gray-300"
          } ${
            category === "All"
              ? ""
              : isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          style={
            category === "All"
              ? {
                  backgroundColor: colors.primary,
                  color: "white",
                  borderColor: colors.primary,
                }
              : {}
          }
          size="sm"
        >
          All
        </Button>

        <Button
          onClick={() => setCategory("Snacks")}
          className={`border-2 transition-colors duration-300 text-xs sm:text-sm ${
            isDarkMode ? "border-white/20" : "border-gray-300"
          } ${
            category === "Snacks"
              ? ""
              : isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          style={
            category === "Snacks"
              ? {
                  backgroundColor: colors.primary,
                  color: "white",
                  borderColor: colors.primary,
                }
              : {}
          }
          size="sm"
        >
          Snacks
        </Button>

        <Button
          onClick={() => setCategory("Drinks")}
          className={`border-2 transition-colors duration-300 text-xs sm:text-sm ${
            isDarkMode ? "border-white/20" : "border-gray-300"
          } ${
            category === "Drinks"
              ? ""
              : isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          style={
            category === "Drinks"
              ? {
                  backgroundColor: colors.primary,
                  color: "white",
                  borderColor: colors.primary,
                }
              : {}
          }
          size="sm"
        >
          Drinks
        </Button>

        <Button
          onClick={() => setCategory("Food")}
          className={`border-2 transition-colors duration-300 text-xs sm:text-sm ${
            isDarkMode ? "border-white/20" : "border-gray-300"
          } ${
            category === "Food"
              ? ""
              : isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          style={
            category === "Food"
              ? {
                  backgroundColor: colors.primary,
                  color: "white",
                  borderColor: colors.primary,
                }
              : {}
          }
          size="sm"
        >
          Food
        </Button>
      </div>

      <div className="pt-4 md:pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 justify-items-center">
        {showCards.map(
          ({ id, name, description, price, image, item, category }) => (
            <div key={id} className="w-full">
              <Card
                className={`mt-4 md:mt-6 w-full transition ease-in-out delay-100 hover:-translate-y-3 duration-300 ${
                  isDarkMode ? "bg-black" : "bg-white border border-gray-200"
                }`}
              >
                <CardHeader color="blue-gray" className="relative h-32 sm:h-40 md:h-56">
                  <img
                    className="transition ease-in-out duration-200 hover:scale-110 hover:brightness-75 w-full h-full object-cover"
                    src={image}
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody className="flex flex-col gap-2 md:gap-3 p-3 md:p-4">
                  <div>
                    <Typography
                      variant="h5"
                      color="black"
                      className="mb-1 md:mb-2 text-sm sm:text-base md:text-xl lg:text-2xl"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="flex-1 leading-tight">{name}</span>
                        <div className="bg-gray-500 w-8 sm:w-10 md:w-14 text-center h-fit rounded text-[9px] sm:text-[10px] md:text-sm mt-1 md:mt-2 text-white whitespace-nowrap">
                          {category}
                        </div>
                      </div>
                    </Typography>
                    <Typography className="text-gray-400 text-[9px] sm:text-[10px] md:text-sm line-clamp-2">
                      {description}
                    </Typography>
                  </div>
                  <p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl transition-colors duration-300"
                    style={{ color: colors.primary }}
                  >
                    ${price}
                  </p>
                </CardBody>
                <CardFooter className="pt-0 text-center p-3 md:p-4">
                  {item > 0 ? (
                    <div className="w-full bg-gray-500 text-black rounded-lg py-2 px-3 md:px-4">
                      <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                        <button
                          onClick={() => decrease(id)}
                          className="bg-transparent border-none text-black text-base md:text-lg lg:text-xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
                        >
                          -
                        </button>
                        <p className="m-0 text-sm md:text-base lg:text-lg">{item}</p>
                        <button
                          onClick={() => increase(id)}
                          className="bg-transparent border-none text-black text-base md:text-lg lg:text-xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => increase(id)}
                      className="w-full text-white font-semibold transition duration-300 text-[10px] sm:text-xs md:text-base py-2"
                      style={{ backgroundColor: colors.primary }}
                    >
                      + Add To Cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cards;
