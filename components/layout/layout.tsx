import { FC, ReactNode } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import Scroll from "../scroll/scroll";
import styles from "./layout.module.scss";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{`L'Isola delle Storie - dal 1 al 3 luglio 2022 a Gavoi`}</title>
        <meta
          name="description"
          content={`L'Isola delle Storie è il Festival Letterario della Sardegna: un'isola, un desiderio, mai sopito, di condividere una passione, quella per i libri e la letteratura nell'affascinante atmosfera di Gavoi.`}
        />
        <meta property="og:image" content="/images/copertina-lg.png" />
        <link rel="canonical" href="https://www.isoladellestorie.it" />
        <link rel="icon" href="/favicon-light.svg" />
      </Head>
      <div className={styles.rotate}></div>
      <Scroll />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
