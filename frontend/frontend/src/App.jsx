import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/Register";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import About from "./components/About";
import Service from "./components/Service";
import CartPage from "./components/Cartpage"; // 🛒 new page
import { CartProvider } from "./components/Cartcontext"; // ✅ your context

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
