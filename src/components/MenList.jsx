import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ElectronicList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Login first to add items to cart.");
      navigate("/login");
      return;
    }

    dispatch(addItem({ ...product, quantity: 1 }));

    toast.success(`${product.title} added to cart`);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Men's Clothing List
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loading loading-ring loading-lg" style={{ width: "100px", height: "100px" }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const Item = cart[product.id];
            const Quantity = Item ? Item.quantity : 0; 

            return (
              <div key={product.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-72 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p className="text-gray-500 text-sm truncate">{product.description}</p>
                  <p className="text-lg font-bold text-primary">${product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {Quantity}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ElectronicList;
