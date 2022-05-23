import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Social from "../social/social";

const Nav = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;

  const closeMenu = () => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false);
  };

  return (
    <nav
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : "")}
    >
      <ul className={styles.menu}>
        <li>Home</li>
        <li>
          <Link href="/associazione/chi-siamo/">
            <a onClick={() => closeMenu()}>Chi Siamo</a>
          </Link>
        </li>
        <li>
          <Link href="/ospiti/">
            <a onClick={() => closeMenu()}>Ospiti</a>
          </Link>
        </li>
        <li>Programma</li>
        <li>Partner</li>
      </ul>
      <Social />
    </nav>
  );
};

export default Nav;
