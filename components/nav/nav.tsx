import styles from "./nav.module.scss";
import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import Div100vh from "react-div-100vh";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
const menus = [
  {
    title: "Edizione XVII",
    menu: [
      {
        name: "Ospiti",
        url: "/ospiti/",
      },
      {
        name: "Programma",
        url: "/ospiti/",
      },
      {
        name: "Laboratori",
        url: "/ospiti/",
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
    title: "Info Visitatori",
    menu: [
      {
        name: "Dove dormire",
        url: "/ospiti/",
      },
      {
        name: "Dove mangiare",
        url: "/ospiti/",
      },
      {
        name: "Sostieni l’Isola",
        url: "/ospiti/",
      },
      {
        name: "Contatti",
        url: "/news/",
      },
    ],
  },
];

const Nav = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;

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
            <IoIosArrowDropleft className="w-10 h-10" />
          </a>
          <a onClick={changeRight} className={styles.right}>
            <IoIosArrowDropright className="w-10 h-10" />
          </a>
        </div>
        <footer>aaaa</footer>
      </div>
    </Div100vh>
  );
};

export default Nav;
