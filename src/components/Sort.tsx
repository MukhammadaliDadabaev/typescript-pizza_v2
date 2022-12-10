// import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useRef, useState } from "react";
// react-icons
import { TiArrowForward } from "react-icons/ti";
// React-Redux-state
import { useDispatch, useSelector } from "react-redux";
// Redux-toolkit
import { selectSort, setSort } from "../redux/slices/filterSlice";

//---> TYPE MODEL LIST-MENU
type SortItem = {
  name: string;
  sortProperty: string;
};
// TYPE OnClick variable
type PopupClick = MouseEvent & {
  path: Node[];
};

// MODEL LIST-MENU
export const sortList: SortItem[] = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

function Sort() {
  // REDUX-STATE
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  // MODAL FOCUS-CURCOR
  const sortRef = useRef<HTMLDivElement>(null);

  // STATE
  const [open, setOpen] = useState(false);

  // MODEL-HANDLER FUNC
  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  // MODAL FOCUS-CURCOR
  useEffect(() => {
    // console.log("Sort-bosildi, mount");
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
        // console.log("Home-page bosildi");
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    // BUNDA BASHQA-PAGEDA ISHLAMASLIGI-UCHUN
    return () => {
      // console.log("Boshqa-page, unmount");
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <TiArrowForward className="arrow" />
        <b>Сортировка: </b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, ind) => (
              <li
                key={ind}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
