import React from "react";
import logoSvg from "../assets/img/pizza-logo.svg";
// react-icons
import { AiOutlineShoppingCart } from "react-icons/ai";
// import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";

function Header() {
  // Location
  const location = useLocation();
  // REDUX-HOOKS
  const { items, totalPrice } = useSelector((state) => state.card);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza V2</h1>
              <p>Dunyodagi eng mazali pizza</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {location.pathname === "/" && (
            <Link to="/card" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <AiOutlineShoppingCart className="svg path" />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
