import React, { useEffect, useRef } from "react";
// qs link
import qs from "qs";
// react-router
import { Link, useNavigate } from "react-router-dom";
// React-Redux-state
import { useDispatch, useSelector } from "react-redux";
// Redux-toolkit
import {
  filterCardPageSort,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

// components
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlog";
import Skeleton from "../components/PizzaBlog/Skeleton";
import Pagination from "../components/Pagination";
import {
  cardIsLoading,
  cardPizzas,
  fetchPizzas,
} from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  // ROUTER
  const navigate = useNavigate();
  // REDUX-STATE
  const dispatch = useDispatch();
  // Filter-ROUTER-Render
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // Fetch-API-JSON cards
  const cards = useSelector(cardPizzas);
  // isLoading-status
  const status = useSelector(cardIsLoading);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterCardPageSort);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  // REACT-REDUX
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Fetch-API
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // QUERY-qs ---> 2-render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    // Bu saqlaydi
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, currentPage]);

  // ROUTER-LINK---> 1-render
  // Bu agar birinchi render bo'lsa, parametrlarni tekshiring va uni reduxda saqlang
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API-DATE
  // Bu 1-chi render-dan keyin card-to'ladi
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // OBJECT-ARRAY
  const pizzas = cards.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />{" "}
    </Link>
  ));

  // CARD isLoading method
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info ">
          <h2>Xatolik ro'y berdi😕</h2>
          <p>
            Afsuski, Pitsa olinmadi 🤔 <br /> Keyinroq qayta urinib ko'ring 😎
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
