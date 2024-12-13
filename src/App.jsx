import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jewelery from './pages/Jewelery';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetail from './pages/detailProduct'; 
import Product from './pages/Product';
import Electronics from "./pages/Electronics";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import '@fontsource/audiowide';
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const fetchedProducts = response.data.map((product) => ({
          ...product,
          quantity: 20, 
        }));

        setProducts(fetchedProducts); 

        const cart = fetchedProducts.reduce((acc, product) => {
          acc[product.id] = { ...product, quantity: 20 }; 
          return acc;
        }, {});

        localStorage.setItem("cart", JSON.stringify(cart)); 
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/jewelery' element={<Jewelery />} />
        <Route path="/electronics" element={<Electronics />}></Route>
        <Route path="/mens" element={<Mens />}></Route>
        <Route path="/womens" element={<Womens />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>

  );
};

export default App;
