import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeMovies from "./pages/HomeMovies";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import AllMovie from "./pages/AllMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeMovies />} />
        <Route path=":id" element={<DetailPage />} />
        <Route path="/search/:s" element={<SearchPage />} />
        <Route path="/genre/:name/:genre" element={<CategoryPage />} />
        <Route path='/allmovie' element={<AllMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
