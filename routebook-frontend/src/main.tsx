import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Navbar from "./components/navbar.tsx";
import App from "./App.tsx";
import Login from "./pages/login.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Journal from "./pages/journal.tsx";
import Itinerary from "./pages/itinerary.tsx"
import CreateItinerary from "./pages/createItinerary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/itinerary" element={<Itinerary />}>
            <Route path="create" element={<CreateItinerary />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
