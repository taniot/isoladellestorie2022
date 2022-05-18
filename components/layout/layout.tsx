import { FC, ReactNode } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

import styles from "./layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
