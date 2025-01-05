/** @format */

import React, { useState, useEffect, useContext } from "react";
import { MarketContext } from "../context/MarketProvider";

const CategoryPage = () => {
  const { contextProds } = useContext(MarketContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=50");
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();

        const uniqueCategories = await [
          ...new Set(data.products.map((product) => product.category)),
        ];
        console.log(uniqueCategories);

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Kategoriyalarni olishda xatolik:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      let url = "https://dummyjson.com/products?limit=50";

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=50`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();

        if (category) {
          setProducts(data.products);
          console.log(data);
        } else {
          setProducts(contextProds);
        }
      } catch (error) {
        console.error("Mahsulotlarni olishda xatolik:", error);
      }
    };

    fetchProductsByCategory();
  }, [category, contextProds]);

  return (
    <div className="p-10 w-full bg-[#f7dfc3] pt-28">
      <div className="text-right mb-10 mr-5 flex justify-end items-center gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-[210px] h-[50px] pl-2 shadow-[#b9a48c] shadow-xl rounded-lg border-[1px] border-[#8d765b] bg-[#8d765b] text-white"
        >
          <option value="">All Categories</option>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat ? cat : "No Name"}
              </option>
            ))
          ) : (
            <option disabled>No Categories Found</option>
          )}
        </select>

        <button
          type="button"
          onClick={() => setCategory("")}
          className="w-[90px] h-[45px] bg-blue-800 text-white shadow-[#b9a48c] shadow-xl rounded-xl"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="w-[23%] h-[370px] bg-[#b8a187] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-[#9b866e]"
            >
              <div className="overflow-hidden h-[80%]">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-[100%] object-cover transform transition-transform duration-300 hover:translate-y-[-10px] hover:scale-105"
                />
              </div>

              <div className="p-4 bg-[#8f7b64] h-[25%]">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                  <h4 className="text-xs text-white">{product.price} $</h4>
                </div>
                <p className="text-sm text-gray-200 mt-2">{product.description}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-6xl">No Products Found</h1>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
