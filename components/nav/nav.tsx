import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Social from "../social/social";
import Image from "next/image";

const Nav = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;

  const closeMenu = (e: { preventDefault: () => void }) => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false);
  };

  return (
    <nav
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : "")}
    >
      <div className={styles.navCointainer}>
        <div className={styles.headerNav}>
          <Image
            src="/images/l-isola-delle-storie-logo-xvii-oriz.svg"
            alt="logo"
            width={400}
            height={250}
            className={styles.logo}
          />
        </div>
        <div className={styles.menuContainer}>
          <div className={cls(styles.menu, styles.visitatori)}>
            <h2>Info Visitatori</h2>
            <ul>
              <li>
                <Link href="/info-visitatori/come-arrivare/">
                  <a onClick={closeMenu}>Arrivare</a>
                </Link>
              </li>
              <li>
                <Link href="/info-visitatori/dove-dormire/">
                  <a onClick={closeMenu}>Dormire</a>
                </Link>
              </li>
              <li>
                <Link href="/info-visitatori/dove-mangiare/">
                  <a onClick={closeMenu}>Mangiare</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={cls(styles.menu, styles.main)}>
            <ul>
              <li>
                <Link href="/">
                  <a onClick={closeMenu}>HOME</a>
                </Link>
              </li>
              <li>
                <Link href="/ospiti/">
                  <a onClick={closeMenu}>Ospiti</a>
                </Link>
              </li>
              <li>
                <Link href="/programma/">
                  <a onClick={closeMenu}>Programma</a>
                </Link>
              </li>
              <li>
                <Link href="/programma/">
                  <a onClick={closeMenu}>Mostre</a>
                </Link>
              </li>

              <li>
                <Link href="/news/">
                  <a onClick={closeMenu}>News & Stampa</a>
                </Link>
              </li>
              <li>
                <Link href="/programma/">
                  <a onClick={closeMenu}>Sponsor</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/associazione/chi-siamo/">
                  <a onClick={closeMenu}>L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/associazione/sostieni-lisola/">
                  <a onClick={closeMenu}>Sostieni L’Isola</a>
                </Link>
              </li>

              <li>
                <Link href="/associazione/contatti/">
                  <a onClick={closeMenu}>Contatti</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Social />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
