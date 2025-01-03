/** @format */
import axios from "axios";
import React, { createContext, useState } from "react";

export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const [aboutProducts, setAboutProductss] = useState([]);
  const [contextProds, setContextProds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getAllProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/products?_page=${page}&_limit=12`);
      setAboutProductss(response.data);
      const totalProductsResponse = await axios.get("http://localhost:5000/products");
      const totalCount = totalProductsResponse.data.length;
      setTotalPages(Math.ceil(totalCount / 12));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MarketContext.Provider
      value={{
        setContextProds,
        contextProds,
        aboutProducts,
        setAboutProductss,
        getAllProducts,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
