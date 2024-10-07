import React from "react";
import style from "./Header.module.scss";

type Props = {};

function Header({}: Props) {
  return (
    <header className={style.header}>
      <div className={style.spacer}></div>
      <h1 className={style.title}>Weather App</h1>
      <button className={style.searchButton}>🔍</button>
    </header>
  );
}

export default Header;
