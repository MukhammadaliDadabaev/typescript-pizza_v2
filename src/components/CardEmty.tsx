import React from "react";
import { Link } from "react-router-dom";
import cardEmtyImg from "../assets/img/empty-cart.png";

const CardEmty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Savatcha bo'sh<span>😕</span>
    </h2>
    <p>
      Siz hali pitsa buyurtma qilmagan bo'lsangiz kerak.
      <br />
      Pitsa buyurtma qilish uchun asosiy sahifaga o'ting.
    </p>
    <img src={cardEmtyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
);
export default CardEmty;
