import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext, useEffect } from "react";
import AppContext from "../../store/AppContext";

const Nav = () => {
  const context = useContext(AppContext);
  const { state } = context;

  return (
    <nav
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : "")}
    >
      <ul className={styles.menu}>
        <li>Home</li>
        <li>Chi Siamo</li>
        <li>Ospiti</li>
        <li>Programma</li>
        <li>Partner</li>
      </ul>
    </nav>
  );
};

export default Nav;
