import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-full flex justify-center items-center h-screen bg-muted-foreground">
      <App />
    </div>
  </StrictMode>
);
