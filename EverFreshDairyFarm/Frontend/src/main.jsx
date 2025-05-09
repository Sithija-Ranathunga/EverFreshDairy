import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./Content/AppContent.jsx";
import { AppContextProvider as VetContextProvider } from "./Content/AppContentvet.jsx";
import { AppContextProvider as MilkingContextProvider } from "./Content/AppContentMilking.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <VetContextProvider>
        <MilkingContextProvider>
          <App />
        </MilkingContextProvider>
      </VetContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
