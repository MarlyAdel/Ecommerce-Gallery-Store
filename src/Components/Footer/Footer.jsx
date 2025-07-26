import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-fuchsia-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6 mt-10 border-t dark:border-gray-700">
      <div className="container">
        <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-merienda text-fuchsia-600 font-bold mb-4">
              RouteStore
            </h2>
            <p className="text-sm">
              Your go-to place for stylish shopping and amazing deals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-fuchsia-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-fuchsia-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-fuchsia-600 transition"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-fuchsia-600 transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-fuchsia-500">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              <a href="#" className="hover:text-fuchsia-600 transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-fuchsia-600 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-fuchsia-600 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-fuchsia-600 transition">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8 border-t pt-4 dark:border-gray-700">
          <p>
            &copy; {new Date().getFullYear()} RouteStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
