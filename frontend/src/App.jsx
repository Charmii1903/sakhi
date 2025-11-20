import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import Collection from './pages/Collection';
import Summer from './pages/Summer';
import Winter from './pages/Winter';
import Fall from './pages/Fall';
import Spring from './pages/Spring';
import Ethnic from './pages/Ethnic';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Wishlist from './pages/Wishlist';
import UserDashboard from './pages/UserDashboard';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading'; 
import NotFound from './components/NotFound';
import RecommendationsPage from './pages/RecommendationsPage';
import ProfilePage from './pages/Profile';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.fastbots.ai/embed.js";
    script.defer = true;
    script.setAttribute("data-bot-id", "cm8j3m6pr0wjmrik6bw8w2jth");
    document.body.appendChild(script);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => {
      clearTimeout(timer);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading && <Loading />} 
      {!loading && (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-orange-50">
          <ToastContainer />

          <Navbar />
          <SearchBar />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/summer" element={<Summer />} />
            <Route path="/winter" element={<Winter />} />
            <Route path="/fall" element={<Fall />} />
            <Route path="/spring" element={<Spring />} />
            <Route path="/ethnic" element={<Ethnic />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/recommendation" element={<RecommendationsPage />} />
          </Routes>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;