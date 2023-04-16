import "./App.css";
import Navbar from "./components/nav-bar";
import Landing from "./pages/landing";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-loading";
import Auth from "./pages/auth";
import ContactUs from "./pages/contact-us";
import Dashboard from "./pages/dashboard";
import Features from "./pages/features";
import AboutUs from "./pages/about-us";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Navbar />
        <Routes>
          <Route loading path="/" element={<Landing />} />
          <Route loading path="/auth" element={<Auth />} />
          <Route loading path="/contact-us" element={<ContactUs />} />
          <Route loading path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
