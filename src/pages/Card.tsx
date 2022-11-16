import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItems, selectCard } from "../redux/slices/cardSlice";
import { Link } from "react-router-dom";
// react-icon
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegTrashAlt, FaChevronLeft } from "react-icons/fa";

import CardItem from "../components/CardItem";
import CardEmty from "../components/CardEmty";

const Card: React.FC = () => {
  // REDUX-DISPATCH
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCard);

  // JAMI-SUMMA
  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

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
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <AiOutlineShoppingCart className="svg path" />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <FaRegTrashAlt className="svg path" />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className="content__items">
          {items.map((item: any) => (
            <CardItem key={item.id} {...item} />
          ))}
        </div>

        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <FaChevronLeft className="svg path" />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
