import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useEffect, useState } from "react";


export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();

  const [loading, setLoading] = useState(true);

  //* Total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  //* Total items
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="block text-fuchsia-600 text-2xl font-bold mb-2">
            Loading ...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>

      <section className="cart">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 pb-24">
          <div className="pt-28">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-lora font-bold sm:text-left mb-8">
                Cart 🛒
              </h2>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Clear All
                </button>
              )}
            </div>
            {cartItems.length === 0 ? (
              <p className="text-xl sm:text-4xl font-semibold text-center pb-40 mt-12">
                Your cart is empty..
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between border-b py-12 gap-4 text-center sm:text-left"
                >
                  <Link to={`/productdetails/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      width={"200px"}
                      className="cursor-pointer transform transition duration-300 hover:scale-110"
                    />
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:text-black"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:text-black"
                    >
                      +
                    </button>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            {/* Cart Summary Section */}
            {cartItems.length > 0 && (
              <div className="mt-8 flex justify-end pt-12">
                <div className="w-full max-w-sm bg-fuchsia-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>Number of Items:</span>
                    <span>{calculateTotalItems()}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Total Price:</span>
                    <span className="font-bold">${calculateTotalPrice()}</span>
                  </div>

                  <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded mb-2 transition">
                    Checkout
                  </button>

                  <Link to="/gallery">
                    <button className="w-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded transition hover:bg-gray-200 dark:hover:bg-gray-700">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
