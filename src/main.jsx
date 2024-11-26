import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pop from "./components/Pop";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pop />
  </StrictMode>,
);
