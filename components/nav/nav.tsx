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
import { getTranslation } from "../../lib/wp/translations";
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
        name: "Come fare",
        url: "/info-visitatori/come-fare/",
      },
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
                <h2>
                  {getTranslation(
                    state?.translations,
                    "menu_info_visitatori",
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_come_fare",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_come_fare",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_dove_dormire",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_dove_dormire",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_dove_mangiare",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_dove_mangiare",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_sostieni_lisola",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_sostieni_lisola",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_contatti",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_contatti",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={cls(styles.menu, styles.main)}>
                <h2>
                  {getTranslation(
                    state?.translations,
                    "menu_edizione",
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_ospiti",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_ospiti",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_programma",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_programma",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_laboratori",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_laboratori",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_news",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_news",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_sponsor",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_sponsor",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={cls(styles.menu, styles.chisiamo)}>
                <h2>
                  {getTranslation(
                    state?.translations,
                    "menu_chi_siamo",
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_associazione",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_associazione",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_festival",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_festival",
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        "menu_luogo",
                        state?.language,
                        "link"
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          "menu_luogo",
                          state?.language
                        )}
                      </a>
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
