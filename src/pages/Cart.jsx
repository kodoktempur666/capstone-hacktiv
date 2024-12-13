import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, reduceQuantity, addMoreQuantity, deleteAll } from "../redux/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const [localCart, setLocalCart] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setLocalCart(savedCart);
    }
  }, []);

  const handleRemoveItem = (id) => {
    console.log("Menghapus item dengan ID:", id);
    dispatch(removeItem(id));
  };

  const handleReduceQuantity = (id) => {
    console.log("Mengurangi item dengan ID:", id);
    dispatch(reduceQuantity(id));
  };

  const handleIncreaseQuantity = (id) => {
    console.log("Menambahkan item dengan ID:", id);
    dispatch(addMoreQuantity(id));
  };

  const handleCheckout = () => {
    const updatedCart = { ...localCart };
    cart.forEach(item => {
      if (updatedCart[item.id]) {
        updatedCart[item.id].quantity -= item.quantity; 
      }
    });
    

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    dispatch(deleteAll());
    dispatch({ type: 'cart/clearCart' });
    toast.success('Checkout successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="alert accent-content shadow-lg">
          <div>
            <span>Cart is empty</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-xl">
                <figure className="p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl w-32 h-32 object-contain mx-auto"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">{item.title}</h2>
                  <p className="text-gray-500 text-sm text-center">Quantity: {item.quantity}</p>
                  <p className="text-center text-lg font-bold text-primary">
                    Price: ${(item.price).toLocaleString()}
                  </p>
                  <p className="text-center text-lg font-bold text-secondary">
                    Subtotal: ${(item.price * item.quantity).toLocaleString()}
                  </p>
                  <div className="card-actions justify-center mt-4">
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4 mt-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleReduceQuantity(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-end mt-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Total Price: ${total.toFixed(2)}
            </h3>
            <button
              className="btn btn-success mt-4"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
