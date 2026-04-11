import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "./styles/theme.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#8B6F47",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "14px",
        },
      }}
    />
    </BrowserRouter>
  </StrictMode>
);