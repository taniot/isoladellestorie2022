import styles from "./intro.module.scss";
import arrow from "./arrow.module.scss";
import Div100vh from "react-div-100vh";

import cls from "classnames";

const Intro = () => (
  <Div100vh className={styles.banner}>
    <div className={styles.imgBg}></div>
    <div className={styles.slogan}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>L’Isola delle Storie</h1>
        <div className={styles.whenTitle}>
          <span className={styles.place}>Gavoi</span>
          <span className={styles.date}>01.07 - 03.07.2022</span>
        </div>
      </div>
      <h2 className={styles.subTitle}>Festival Letterario della Sardegna</h2>
      <svg className={arrow.arrows}>
        <path className={arrow.a1} d="M0 0 L30 32 L60 0"></path>
        <path className={arrow.a2} d="M0 20 L30 52 L60 20"></path>
        <path className={arrow.a3} d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  </Div100vh>
);

export default Intro;
