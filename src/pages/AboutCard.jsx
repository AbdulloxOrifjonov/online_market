/** @format */

import React, { useContext, useEffect } from "react";
import { MarketContext } from "../context/MarketProvider";
import { useNavigate } from "react-router-dom";

const AboutCard = () => {
  const { aboutProducts, setSelectedProduct } = useContext(MarketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!aboutProducts) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [aboutProducts]);

  const handleAddToCart = () => {
    if (aboutProducts) {
      setSelectedProduct({
        id: aboutProducts.id,
        title: aboutProducts.title,
        price: aboutProducts.price,
        thumbnail: aboutProducts.thumbnail,
      });
      alert(`${aboutProducts.title} added to cart!`);
    }
  };

  return (
    <div className="w-[100%] h-[571px] bg-[#f7dfc3] pt-[40px] pb-[40px]">
      <div className="max-w-[400px] mx-auto bg-[#d4bea2] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl">
        <div className="overflow-hidden h-[300px]">
          <img
            src={aboutProducts?.thumbnail}
            alt={aboutProducts.title}
            className="w-full h-[100%] object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{aboutProducts.title}</h3>
          <p className="text-sm text-gray-600 mt-1">Price: ${aboutProducts.price}</p>
        </div>

        <div className="p-4 border-t flex items-center justify-between border-gray-200 bg-[#947f66]">
          <button
            onClick={handleAddToCart}
            className="w-[105px] h-[40px] text-white rounded-lg text-sm bg-blue-700 hover:bg-blue-800"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
