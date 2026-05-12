import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";

const loadingElement = document.getElementById("loading");
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <BookingProvider>
        <AuthProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </AuthProvider>
      </BookingProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
if (loadingElement) {
  loadingElement.style.transition = "opacity 0.3s";
  loadingElement.style.opacity = "0";
  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 300);
}
