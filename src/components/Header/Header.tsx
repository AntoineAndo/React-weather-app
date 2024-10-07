import React from "react";
import style from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

type Props = {};

function Header({}: Props) {
  return (
    <header className={style.header}>
      <div className={style.themeToggleSlot}>
        <ThemeToggle />
      </div>
      <h1 className={style.title}>Weather App</h1>
      <button className={style.searchButton}>🔍</button>
    </header>
  );
}

export default Header;
