/** @format */

import React, { useContext } from "react";
import { MarketContext } from "../context/MarketProvider";
import { useNavigate } from "react-router-dom";

const Sale = () => {
  const { selectedProduct, setSelectedProduct } = useContext(MarketContext);
  const navigate = useNavigate();

  const buy = () => {
    alert("Haridingiz uchun rahmat !");
    setSelectedProduct(null);
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-[#f7dfc3] p-5 flex items-center justify-center">
      <div className="max-w-[400px] w-full bg-white rounded-lg shadow-lg p-5">
        {!selectedProduct ? (
          <p className="text-gray-600 text-center">No product in the cart.</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Selected Product</h2>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-[200px] h-[200px] object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{selectedProduct.title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Price: <span className="font-bold">${selectedProduct.price}</span>
              </p>
              <button
                onClick={() => buy()}
                className="mt-4 w-[120px] h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;
