import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Div100vh from "react-div-100vh";
import Image from "next/image";

const Nav = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;

  const closeMenu = (e: { preventDefault: () => void }) => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false);
  };

  return (
    <Div100vh
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : "")}
    >
      <div className={styles.navCointainer}>
        <div className={styles.navHeader}>
          <div className={styles.langMenu}>ENGLISH VERSION</div>
          <div className={styles.logoContainer}>
            <Link href="/">
              <a onClick={closeMenu}>
                <Image
                  src="/images/l-isola-delle-storie.svg"
                  layout="fill"
                  alt="L’Isola delle Storie 2022"
                  className={styles.logo}
                  priority
                />
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.menuContainer}>
          <div className={cls(styles.menu, styles.visitatori)}>
            <h2>Info Visitatori</h2>
            <ul>
              <li>
                <Link href="/info-visitatori/dove-dormire/">
                  <a onClick={closeMenu}>Dove Dormire</a>
                </Link>
              </li>
              <li>
                <Link href="/info-visitatori/dove-mangiare/">
                  <a onClick={closeMenu}>Dove Mangiare</a>
                </Link>
              </li>
              <li>
                <Link href="/info-visitatori/sostieni-lisola/">
                  <a onClick={closeMenu}>Sostieni L’Isola</a>
                </Link>
              </li>
              <li>
                <Link href="/info-visitatori/contatti/">
                  <a onClick={closeMenu}>Contatti</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={cls(styles.menu, styles.main)}>
            <h2>Edizione XVII</h2>
            <ul>
              <li>
                <Link href="/ospiti/">
                  <a onClick={closeMenu}>Ospiti</a>
                </Link>
              </li>
              <li>
                <Link href="/programma/mercoledi-22-giugno-2022/">
                  <a onClick={closeMenu}>Programma</a>
                </Link>
              </li>
              <li>
                <Link href="/laboratori/sabato-2-luglio-2022/">
                  <a onClick={closeMenu}>Laboratori</a>
                </Link>
              </li>

              <li>
                <Link href="/news/">
                  <a onClick={closeMenu}>News & Stampa</a>
                </Link>
              </li>

              <li>
                <Link href="/sponsor/">
                  <a onClick={closeMenu}>Sponsor</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={cls(styles.menu, styles.chisiamo)}>
            <h2>Chi Siamo</h2>
            <ul>
              <li>
                <Link href="/chi-siamo/lassociazione-lisola-delle-storie/">
                  <a onClick={closeMenu}>L’Associazione L’Isola delle Storie</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-festival/">
                  <a onClick={closeMenu}>Il Festival</a>
                </Link>
              </li>

              <li>
                <Link href="/chi-siamo/il-luogo/">
                  <a onClick={closeMenu}>Il Luogo</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default Nav;
