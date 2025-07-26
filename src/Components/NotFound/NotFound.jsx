import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-center px-6">
      <h1 className="text-6xl font-extrabold text-fuchsia-700 dark:text-fuchsia-400 mb-4">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 rounded-full transition"
      >
        Go Home
      </Link>
    </section>
  );
}
