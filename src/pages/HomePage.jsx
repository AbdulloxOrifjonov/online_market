/** @format */

import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const HomePage = () => {
  const [keyword] = useDebounce("", 600);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  useEffect(() => {
    const fetchProducts = async (offset = 0) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products//search?q=${keyword}&limit=16&skip=${offset}&select=title,price,discountPercentage,images,rating,tags,thumbnail&delay=1000`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.error("Mahsulotlarni olishda xatolik:", error);
      }
    };

    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-10 w-full bg-[#f7dfc3]">
      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedProducts().map((product) => (
          <div
            key={product.id}
            className="w-[23%] bg-[#b8a187] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-[#9b866e]"
          >
            <div className="overflow-hidden">
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-48 object-cover transform transition-transform duration-300 hover:translate-y-[-10px] hover:scale-105"
              />
            </div>

            <div className="p-4">
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
