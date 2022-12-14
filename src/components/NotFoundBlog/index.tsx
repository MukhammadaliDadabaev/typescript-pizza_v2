import React from "react";

import styles from "./NotFoundBlog.module.scss";

const NotFoundBlog: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалени данная страна отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlog;
