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
                src="/images/l-isola-delle-storie-logo-xvii.svg"
                alt="logo"
                layout="fill"
                className={styles.logo}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <Hamburger
          toggled={state?.isMainMenuOpen}
          toggle={setIsMainMenuOpen}
          size={30}
          color={state?.isMainMenuOpen ? "whitesmoke" : "black"}
          label="Show menu"
        />
      </div>
      <div className={styles.comingSoon}>#gavoifest2022</div>
      <Nav />
    </header>
  );
};

export default Header;
