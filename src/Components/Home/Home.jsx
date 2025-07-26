import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about.jpg"
import { useCart } from "../Context/CartContext";


export default function Home() {

   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const {addToCart} = useCart()

    const fetchProducts = async () => {
      try {
        const {data} = await axios.get("https://fakestoreapi.com/products");
        //console.log(data)
        setProducts(data);
      } 
      catch (err) {
        setError("Failed to load products", err);
      } 
      finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    },[])


  return (
    <>
    
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-fuchsia-200 to-fuchsia-200 text-center py-24 px-4 dark:from-slate-800 dark:to-slate-900">
        <div className="container pt-16">
          <h1 className="text-4xl sm:text-6xl font-lora font-bold text-fuchsia-800 dark:text-white">
            Welcome to GalleryStore 🛍️
          </h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Discover amazing products and enjoy a seamless shopping experience.
          </p>
          <Link to="/gallery">
            <button className="mt-6 bg-fuchsia-700 hover:bg-fuchsia-900 text-white px-6 py-3 rounded-full text-lg transition">
              Browse Gallery
            </button>
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="New Arrivals py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center font-lora mb-10 text-fuchsia-700 dark:text-white">
            New Arrivals Products
          </h2>

          {loading && (
            <div className="text-center">
              <span className="block text-fuchsia-600 text-2xl font-bold mb-2">
                Loading ...
              </span>
            </div>
          )}

          {error && <p className="text-center text-red-500 text-lg">{error}</p>}

          {!loading && !error && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
              {products.slice(0, 12).map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800"
                >
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-56 object-contain p-4 cursor-pointer transform transition duration-300 hover:scale-110"
                    />
                  </Link>

                  <div className="p-4">
                    <Link to={`/productdetails/${product.id}`}>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white cursor-pointer">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="rating">
                      <span>
                        {product.rating?.rate || product.rating} ⭐⭐⭐⭐
                      </span>
                    </div>
                    <p className="text-fuchsia-600 font-semibold mt-2">
                      $ {product.price}
                    </p>
                  </div>
                  <div className="flex justify-end me-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-fuchsia-900 p-2  mb-3 text-white rounded-md dark:bg-gray-400"
                    >
                      <i className="fa-solid fa-cart-plus  "></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section*/}
      <section className="about bg-gray-100 dark:bg-gray-900 py-10 px-4">
        <div className="container  grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <img src={aboutImg} alt="About GalleryStore" className="w-[90%] md:ms-0 ms-4" />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-lora font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-4">
              Why Choose GalleryStore ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              At
              <span className="font-bold text-fuchsia-600"> GalleryStore</span>,
              we blend style, simplicity, and smart shopping. Our curated
              collection of high-quality products offers something for everyone,
              all at unbeatable prices.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              Fast delivery, secure payments, and a responsive design make your
              shopping experience seamless across all devices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
