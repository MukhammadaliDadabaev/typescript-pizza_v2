import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
  selectCardItemById,
} from "../../redux/slices/cardSlice";
// react-icon
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { type } from "os";

// Type-Pizza
const typeNames = ["тонкое", "традиционное"];

type PizzaBlogProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlogProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  // REDUX-DISPATCH
  const dispatch = useDispatch();
  const cardItem = useSelector(selectCardItemById(id));
  // State
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cardItem ? cardItem.count : 0;

  // REDUX-TOOLKIT
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, ind) => (
              <li
                key={ind}
                onClick={() => setActiveSize(ind)}
                className={activeSize === ind ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <BsCartPlus className="svg path" />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
