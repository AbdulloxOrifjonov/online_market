/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MarketContext } from "../context/MarketProvider";

const HomePage = () => {
  const { setContextProds, contextProds, setAboutProductss } = useContext(MarketContext);

  const [searchInput, setSearchInput] = useState(""); 
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=1000&select=title,price,discountPercentage,images,rating,tags,thumbnail`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
        setContextProds(data.products);
      } catch (error) {
        console.error("Mahsulotlarni olishda xatolik:", error);
      }
    };

    fetchInitialProducts();
  }, []);

  useEffect(() => {
    setProducts(contextProds);
  }, [searchInput === ""]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchInput}&limit=1000&select=title,price,discountPercentage,images,rating,tags,thumbnail`,
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Qidiruvda xatolik:", error);
    }
  };

  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const navigateToCard = (id) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      navigate(`product/${id}`);
      setAboutProductss(product);
    } else {
      console.error("Mahsulot topilmadi");
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-10 w-full bg-[#f7dfc3] pt-28">
      <div className="text-right mb-10 mr-5 flex items-center justify-end gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[210px] h-[50px] pl-5 shadow-[#b9a48c] shadow-xl rounded-lg border-[1px] border-[#8d765b]"
          placeholder="Search . . ."
        />
        <button
          onClick={handleSearch}
          className="w-[90px] h-[45px] bg-blue-800 text-white shadow-[#b9a48c] shadow-xl rounded-xl"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedProducts().map((product) => (
          <div
            key={product.id}
            className="w-[23%] h-[370px] bg-[#b8a187] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-[#9b866e]"
            onClick={() => navigateToCard(product.id)}
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
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-700 rounded-lg disabled:bg-gray-300"
        >
          Prev
        </button>

        <span className="text-lg text-white">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-700 rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
