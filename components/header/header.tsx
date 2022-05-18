import styles from "./header.module.scss";
import Image from "next/image";
import AppContext from "../../store/AppContext";
import { Squash as Hamburger } from "hamburger-react";
import Nav from "../nav/nav";
import { useContext } from "react";
import Link from "next/link";
const Header = () => {
  const context = useContext(AppContext);
  const { state, setIsMainMenuOpen } = context;

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a>
              <Image
                src="/images/l-isola-delle-storie-logo-xvii-oriz.svg"
                alt="logo"
                layout="fill"
                className={styles.logo}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <a href="#">Scopri il festival</a>
        <Hamburger
          toggled={state?.isMainMenuOpen}
          toggle={setIsMainMenuOpen}
          size={20}
          color={state?.isMainMenuOpen ? "whitesmoke" : "black"}
          label="Show menu"
        />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
