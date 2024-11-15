import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./config/di"

import { App } from "../ui/app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
