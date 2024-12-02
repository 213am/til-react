import { createRoot } from "react-dom/client";
import EventSample3 from "./event-sample/EventSample3";
import EventSample4 from "./event-sample/EventSample4";
import EventSample5 from "./event-sample/EventSample5";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <EventSample5 />
  </>,
);
