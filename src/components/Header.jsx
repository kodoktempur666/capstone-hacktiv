import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAll } from "../redux/cartSlice";
import { useDispatch, useSelector  } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  useEffect(() => {
    const token = localStorage.getItem("token");

    
    setIsLoggedIn(!!token);
    
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    
    dispatch(deleteAll());
    setIsLoggedIn(false);
    toast.warn("Anda telah berhasil logout.");
  };

  return (

    <div className="navbar bg-primary-content shadow-md dark:bg-base-900">
      <div className="flex-1 gap-5">
      <img src="/src/assets/logo.svg" alt="" />
        <Link to="/" className="text-2xl font-bold text-primary font-audiowide">
          
          <strong>Overplus</strong>
        </Link>
      </div>
      <div className="flex-none gap-5">
        <Link
          to="/"
          className="btn btn-ghost text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          Home
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            bg-white
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold ">{totalItems} Items</span>
              <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span>
              <div className="card-actions">
                <Link
                  to="/cart"
                  className="btn btn-ghost text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!isLoggedIn ? (
          <Link to="/login" className="btn btn-outline btn-primary">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default Header;
