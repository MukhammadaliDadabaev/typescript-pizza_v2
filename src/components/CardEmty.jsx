import React from "react";
import { Link } from "react-router-dom";
import cardEmtyImg from "../assets/img/empty-cart.png";

const CardEmty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Savatcha bo'sh<icon>😕</icon>
      </h2>
      <p>
        Siz hali pitsa buyurtma qilmagan bo'lsangiz kerak.
        <br />
        Pitsa buyurtma qilish uchun asosiy sahifaga o'ting.
      </p>
      <img src={cardEmtyImg} alt="Empty cart" />
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
export default CardEmty;
