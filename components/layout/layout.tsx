import { FC, ReactNode } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import Scroll from "../scroll/scroll";
import styles from "./layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Scroll />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
