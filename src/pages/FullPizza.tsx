import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  // STATE
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://634300d53f83935a784df853.mockapi.io/cards/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Olishda xatolik...❌, OK 👇");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1 className="text-center">Yuklanmoqda...🌏</h1>;
  }

  return (
    <div className="container">
      <div className="full_pizza-card">
        <img className="full_img" src={pizza.imageUrl} alt="pizza" />
        <h2 className="full_title">{pizza.title}</h2>
        <p className="full_info">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <h4 className="full_price">{pizza.price} ₽ </h4>
        <Link to="/" className="button button--outline button--add go-back-btn">
          <FaChevronLeft className="svg path" />
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
export default FullPizza;
