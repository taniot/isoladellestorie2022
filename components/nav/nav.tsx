import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Social from "../social/social";

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
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <h2>Info Visitatori</h2>
          <ul>
            <li>
              <Link href="/info-visitatori/dove-dormire/">
                <a onClick={closeMenu}>Dove dormire</a>
              </Link>
            </li>
            <li>
              <Link href="/info-visitatori/dove-mangiare/">
                <a onClick={closeMenu}>Dove mangiare</a>
              </Link>
            </li>
            <li>
              <Link href="/info-visitatori/come-arrivare/">
                <a onClick={closeMenu}>Come arrivare</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.menu}>
          <h2>Edizione XVII</h2>
          <ul>
            <li>
              <Link href="/ospiti/">
                <a onClick={closeMenu}>Ospiti</a>
              </Link>
            </li>
            <li>Programma</li>
            <li>Incontri</li>
            <li>Laboratori</li>
            <li>Mostre</li>
          </ul>
        </div>

        <div className={styles.menu}>
          <h2>Associazione</h2>
          <ul>
            <li>
              <Link href="/associazione/chi-siamo/">
                <a onClick={closeMenu}>Chi siamo</a>
              </Link>
            </li>

            <li>
              <Link href="/associazione/sostieni-lisola/">
                <a onClick={closeMenu}>Sostieni L’Isola</a>
              </Link>
            </li>
            <li>
              <Link href="/sponsor/">
                <a onClick={closeMenu}>Sponsor</a>
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
    </nav>
  );
};

export default Nav;
