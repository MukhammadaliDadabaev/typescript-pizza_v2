import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../redux/slices/cardSlice";
import { Link } from "react-router-dom";
// react-icon
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";

import CardItem from "../components/CardItem";
import CardEmty from "../components/CardEmty";

const Card = () => {
  // REDUX-DISPATCH
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.card);

  // JAMI-SUMMA
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  // DELETE All-CARD-KORZINA
  const onClickClear = () => {
    if (window.confirm("Olingan mahsulotlarni tozalash")) {
      dispatch(clearItems());
    }
  };

  // OPEN-cardEmty
  if (!totalPrice) {
    return <CardEmty />;
  }

  return (
    <div className="container container--cart">
      <div class="cart">
        <div class="cart__top">
          <h2 class="content__title">
            <AiOutlineShoppingCart className="svg path" />
            Корзина
          </h2>
          <div onClick={onClickClear} class="cart__clear">
            <FaRegTrashAlt className="svg path" />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div class="content__items">
          {items.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </div>

        <div class="cart__bottom">
          <div class="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div class="cart__bottom-buttons">
            <Link to="/" class="button button--outline button--add go-back-btn">
              <FaChevronLeft className="svg path" />
              <span>Вернуться назад</span>
            </Link>
            <div class="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
