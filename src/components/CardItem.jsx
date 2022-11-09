import React from "react";
// react-icons
import { HiPlus, HiMinus } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/slices/cardSlice";

const CardItem = ({ id, title, type, size, count, price, imageUrl }) => {
  // REDUX-DISPATCH
  const dispatch = useDispatch();

  // Added count
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      })
    );
  };

  // Remov count
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  // DELETE CARD-KORZINA
  const onClickRemov = () => {
    if (window.confirm("Siz haqiqatan ham mahsulotni o'chirmoqchimisiz ?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div class="cart__item">
      <div class="cart__item-img">
        <img class="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div class="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div class="cart__item-count">
        <div
          onClick={onClickMinus}
          class="button button--outline button--circle cart__item-count-minus"
        >
          <HiPlus />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          class="button button--outline button--circle cart__item-count-plus"
        >
          <HiMinus />
        </div>
      </div>
      <div class="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div class="cart__item-remove">
        <div
          onClick={onClickRemov}
          // class="button button--outline button--circle"
        >
          <FaTimes className="time-icon" />
        </div>
      </div>
    </div>
  );
};
export default CardItem;
