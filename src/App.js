/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AboutCard from "./pages/AboutCard";
import Sale from "./pages/Sale";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="product/:id" element={<AboutCard />} />
          <Route path="sale" element={<Sale />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
