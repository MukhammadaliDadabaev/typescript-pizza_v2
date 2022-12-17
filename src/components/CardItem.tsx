import React from "react";
// react-icons
import { HiPlus, HiMinus } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addItem,
  minusItem,
  removeItem,
  CartItem,
} from "../redux/slices/cardSlice";
// import { type } from "os";

type CardItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
  imageUrl: string;
};

const CardItemBlock: React.FC<CardItemProps> = ({
  id,
  title,
  type,
  size,
  count,
  price,
  imageUrl,
}) => {
  // REDUX-DISPATCH
  const dispatch = useDispatch();

  // Added count
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItem)
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
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <HiMinus />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <HiPlus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
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
export default CardItemBlock;
