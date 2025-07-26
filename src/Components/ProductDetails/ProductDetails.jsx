import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {addToCart} = useCart()

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductDetails(data);
    } 
    catch (err) {
      setError("Failed to load product details.");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="text-center mt-24">
      <span className="block text-fuchsia-600 text-2xl font-bold mb-2">
        Loading ...
      </span>
    </div>
  );
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <>
      {/* ProductDetails */}
      <section className="productdetails min-h-screen">
        <div className="container pt-16 ">
          <div className="container mx-auto px-4 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2  items-center">
              <div className="text-center">
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  className="w-80 h-auto mx-auto"
                />
              </div>

              <div className="mt-16 md:mt-0 me-0 md:me-20">
                <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
                  {productDetails.title.split(" ").splice(0, 3).join(" ")}
                </h1>
                <p className="font-bold">
                  Category :
                  <span className="font-normal">
                    {" "}
                    {productDetails.category}
                  </span>
                </p>
                <p className="font-bold">
                  Stock :{" "}
                  <span className="font-normal">
                    {" "}
                    {productDetails.rating.count}
                  </span>
                </p>
                <p className="text-lg font-medium mt-2">Product Description </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {productDetails.description}
                </p>
                <div className="rating mb-2">
                  <span>
                    {" "}
                    Rating :{" "}
                    {productDetails.rating?.rate || productDetails.rating}{" "}
                    ⭐⭐⭐⭐
                  </span>
                </div>
                <p className="text-xl font-semibold text-fuchsia-600 mb-2">
                  ${productDetails.price}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => addToCart(productDetails)}
                    className="bg-fuchsia-900 p-2 mb-3 text-white rounded-md dark:bg-gray-400 "
                  >
                    <i className="fa-solid fa-cart-plus  "></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="relatedProducts mb-50 md:mt-0 mt-24">
        <div className="container">
          <div className="related-title ms-4">
            <h2 className="text-4xl font-semibold font-lora">
              Related Products
            </h2>
          </div>
          <RelatedProduct
            categoryId={productDetails.category}
            currentProductId={productDetails.id}
          />
        </div>
      </section>
    </>
  );
}
