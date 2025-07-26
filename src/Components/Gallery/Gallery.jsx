import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";


export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const {addToCart} = useCart()

  
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      //console.log(data)
      setProducts(data);
      setDisplayedProducts(data);
    } 
    catch (err) {
      setError("Failed to load products");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //^ Handle search
  useEffect(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    //^ Handle sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, sortOption, products]);

  return (
    <>

      {/* Gallery */}
      <section className="gallery">
        <div className="container pt-11">
          <div className=" mx-auto px-4 py-16">
            <h2 className="text-3xl font-lora font-bold text-center text-fuchsia-600 mb-12 dark:text-white">
              All Products
            </h2>

            {/* Search */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-12">
              <input
                type="text"
                placeholder="Search products..."
                className="border px-4 py-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Sort */}
              <select
                className="border px-4 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:bg-gray-800 dark:text-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="name-az">Name (A–Z)</option>
              </select>
            </div>

            {loading && (
              <div className="text-center mt-8">
                <span className="block text-fuchsia-600 text-2xl font-bold mb-2">
                  Loading ...
                </span>
              </div>
            )}

            {error && (
              <p className="text-center text-red-500 text-lg">{error}</p>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedProducts.length === 0 ? (
                  <div className="col-span-full flex justify-center items-center py-10">
                    <p className=" text-gray-600 text-2xl">
                      No products found.
                    </p>
                  </div>
                ) : (
                  displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800"
                    >
                      <Link to={`/productdetails/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-contain mb-4 cursor-pointer transform transition duration-300 hover:scale-110"
                        />
                      </Link>

                      <Link to={`/productdetails/${product.id}`}>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 cursor-pointer">
                          {product.title.split(" ").splice(0, 3).join(" ")}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                      <div className="rating">
                        <span>
                          {product.rating?.rate || product.rating} ⭐⭐⭐⭐
                        </span>
                      </div>
                      <p className="text-fuchsia-600 font-semibold mt-2">
                        ${product.price}
                      </p>
                      <div className="flex justify-end me-4">
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-fuchsia-900 p-2  mb-3 text-white rounded-md dark:bg-gray-400"
                        >
                          <i className="fa-solid fa-cart-plus  "></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
