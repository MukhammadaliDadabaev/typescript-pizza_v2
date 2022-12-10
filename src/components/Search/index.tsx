import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
// LODASH.DBOUNCE
import debounce from "lodash.debounce";

// react-icons
import { GrSearch, GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const SearchContext = React.createContext("");

const Search: React.FC = () => {
  const dispatch = useDispatch();
  //-------> STATE
  const [value, setValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  //------> Hendler func
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };
  //------> Lodash-input useCallback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <GrSearch className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <GrFormClose onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;
