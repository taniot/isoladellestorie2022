import styles from "./header.module.scss";
import Image from "next/image";
import AppContext from "../../store/AppContext";
import { Squash as Hamburger } from "hamburger-react";
import Nav from "../nav/nav";
import { useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "../../hooks/useMediaQuery";
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
                  className={styles.logo}
                  priority
                />
              ) : (
                <Image
                  src="/images/l-isola-delle-storie-logo-xvii.svg"
                  alt="logo"
                  layout="fill"
                  className={styles.logo}
                  priority
                />
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.menuContainer}>
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
