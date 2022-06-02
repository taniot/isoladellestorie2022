import styles from "./header.module.scss";
import Image from "next/image";

import { Squash as Hamburger } from "hamburger-react";
import Nav from "../nav/nav";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import Link from "next/link";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import cls from "classnames";
const Header = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;
  const isSmall = useMediaQuery("(max-width: 1023px)");

  const closeMenu = (e: { preventDefault: () => void }) => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a onClick={closeMenu}>
              {isSmall ? (
                <Image
                  src="/images/l-isola-delle-storie-logo-xvii-oriz.svg"
                  alt="logo"
                  layout="fill"
                  className={cls(styles.logo, "logoImg")}
                  priority
                />
              ) : (
                <Image
                  src="/images/l-isola-delle-storie-logo-xvii.svg"
                  alt="logo"
                  layout="fill"
                  className={cls(styles.logo, "logoImg")}
                  priority
                />
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className={cls(styles.menuContainer)}>
        <Hamburger
          toggled={state?.isMainMenuOpen}
          toggle={setIsMainMenuOpen}
          size={isSmall ? 24 : 30}
          color={state?.isMainMenuOpen ? "whitesmoke" : "black"}
          label="Show menu"
        />
      </div>

      <Nav />
    </header>
  );
};

export default Header;
