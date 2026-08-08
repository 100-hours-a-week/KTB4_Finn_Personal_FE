import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./css/common.css";
import "./css/home.css";
import "./css/detail.css";
import "./css/settings.css";
import "./css/editor.css";
import "./css/auth.css";
import "./css/map-test.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
