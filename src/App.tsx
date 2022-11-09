// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//scss styles
import "./scss/app.scss";
//components
import Home from "./pages/Home";
import Card from "./pages/Card";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

// export const SearchContext = React.createContext<string>("");

function App() {
  // // SEARCH-INPUT STATE
  // const [searchValue, setSearchValue] = useState<string>("");

  return (
    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // </SearchContext.Provider>
  );
}

export default App;
