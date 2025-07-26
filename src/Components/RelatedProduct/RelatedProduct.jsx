import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function RelatedProduct({ categoryId, currentProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  async function getRelatedProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const result = data.filter(
        (product) =>
          product.category === categoryId && product.id !== currentProductId
      );

      setRelatedProducts(result);
      console.log(result);
    } 
    catch (err) {
      console.error("Failed to fetch related products:", err);
    }
  }


  useEffect(() => {
    if (categoryId && currentProductId) {
      getRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="border-2 p-4 rounded shadow">
            <Link to={`/productdetails/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 mx-auto mb-3 object-fill cursor-pointer transform transition duration-300 hover:scale-110"
              />
            </Link>
            <p className="text-sm text-gray-500">{product.category}</p>
            <Link to={`/productdetails/${product.id}`}>
              <h2 className="text-xl font-semibold mt-1 cursor-pointer">
                {product.title.split(" ").splice(0, 4).join(" ")}
              </h2>
            </Link>
            <div className="rating">
              <span>{product.rating?.rate || product.rating} ⭐⭐⭐⭐</span>
            </div>
            <p className="text-xl font-medium text-fuchsia-600">
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
        ))}
      </div>
    </>
  );
}
