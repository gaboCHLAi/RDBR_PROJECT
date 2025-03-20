 
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./root"; 
import "./main.scss";
import "@fontsource/firago";  
import "@fontsource/firago/500.css";  
import "@fontsource/firago/700.css";  
import "bootstrap/dist/css/bootstrap.min.css";

 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
