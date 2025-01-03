/** @format */

import React, { useContext, useEffect } from "react";
import { MarketContext } from "../context/MarketProvider";
import { useNavigate } from "react-router-dom";

const AboutCard = () => {
  const { aboutProducts } = useContext(MarketContext);
  console.log(aboutProducts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!aboutProducts) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [aboutProducts]);

  return (
    <div className="w-[100%] h-[100%] bg-[#f7dfc3] pt-9 pb-[33px]">
      <div className="max-w-[400px] mx-auto bg-[#d4bea2] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl  ">
        <div className="overflow-hidden h-[300px]">
          <img
            src={aboutProducts?.thumbnail}
            alt={aboutProducts.title}
            className="w-full h-[100%] object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{aboutProducts.title}</h3>
          <p className="text-sm text-gray-600 mt-1">Tags: {aboutProducts.tags.join(", ")}</p>
          <p className="text-sm text-gray-600 mt-2">
            Discount: {aboutProducts.discountPercentage}%
          </p>
        </div>

        <div className="p-4 border-t border-gray-200 bg-[#947f66]">
          <div className="mt-4">
            <p className="text-sm text-gray-800">
              Price: <span className="font-bold">${aboutProducts.price}</span>
            </p>
            <p className="text-sm text-gray-800">
              Rating: <span className="font-bold">{aboutProducts.rating}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
