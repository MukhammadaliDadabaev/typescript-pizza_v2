// import { type } from "os";
import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (ind: number) => void;
};
// ITEM-MASSIV
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, ind) => (
          <li
            key={ind}
            onClick={() => onChangeCategory(ind)}
            className={value === ind ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
