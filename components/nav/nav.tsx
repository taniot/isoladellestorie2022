import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Div100vh from "react-div-100vh";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useMediaQuery } from "../../hooks/useMediaQuery";
const menus = [
  {
    class: "main",
    title: "Edizione XVII",
    menu: [
      {
        name: "Ospiti",
        url: "/ospiti/",
      },
      {
        name: "Programma",
        url: "/programma/mercoledi-22-giugno-2022/",
      },
      {
        name: "Laboratori",
        url: "/laboratori/sabato-2-luglio-2022/",
      },
      {
        name: "News & Stampa",
        url: "/news/",
      },
      {
        name: "Sponsor",
        url: "/sponsor/",
      },
    ],
  },
  {
    class: "visitatori",
    title: "Info Visitatori",
    menu: [
      {
        name: "Dove dormire",
        url: "/info-visitatori/dove-dormire/",
      },
      {
        name: "Dove mangiare",
        url: "/info-visitatori/dove-mangiare/",
      },
      {
        name: "Sostieni l’Isola",
        url: "/info-visitatori/sostieni-lisola/",
      },
      {
        name: "Contatti",
        url: "/info-visitatori/contatti/",
      },
    ],
  },
  {
    class: "chisiamo",
    title: "Chi siamo",
    menu: [
      {
        name: "L’ASSOCIAZIONE L’ISOLA DELLE STORIE",
        url: "/chi-siamo/lassociazione-lisola-delle-storie/",
      },
      {
        name: "Il Festival",
        url: "/chi-siamo/il-festival/",
      },
      {
        name: "Il Luogo",
        url: "/chi-siamo/il-luogo/",
      },
    ],
  },
];

const Nav = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const closeMenu = (e: { preventDefault: () => void }) => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false);
  };

  const changeLeft = (e: { preventDefault: () => void }) => {
    let newPosition = currentPosition - 1;
    if (newPosition < 0) newPosition = menus.length - 1;

    setCurrentPosition(newPosition);
  };

  const changeRight = (e: { preventDefault: () => void }) => {
    let newPosition = currentPosition + 1;
    if (newPosition > menus.length - 1) newPosition = 0;

    setCurrentPosition(newPosition);
  };

  const [currentMenu, setCurrentMenu] = useState(menus[0]);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    let menu = menus[currentPosition];
    setCurrentMenu(menu);
  }, [currentPosition]);

  return (
    <Div100vh
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : "")}
    >
      <div className={styles.navCointainer}>
        <div className={styles.navHeader}>
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
        {isMobile && (
          <>
            <div className={styles.menuContainer}>
              <div className={cls(styles.menu, styles.visitatori)}>
                <h2>{currentMenu.title}</h2>
                <ul>
                  {currentMenu.menu?.map((menu) => {
                    return (
                      <li key={uuidv4()}>
                        <Link href={menu.url}>
                          <a onClick={closeMenu}>{menu.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <a onClick={changeLeft} className={styles.left}>
                <IoIosArrowDropleft className="w-7 h-7" />
              </a>
              <a onClick={changeRight} className={styles.right}>
                <IoIosArrowDropright className="w-7 h-7" />
              </a>
            </div>
          </>
        )}
        {!isMobile && (
          <>
            {" "}
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
                      <a onClick={closeMenu}>
                        L’Associazione L’Isola delle Storie
                      </a>
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
          </>
        )}
      </div>
    </Div100vh>
  );
};

export default Nav;
