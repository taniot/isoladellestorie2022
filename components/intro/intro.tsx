import styles from "./intro.module.scss";
import Div100vh from "react-div-100vh";

const Intro = () => (
  <div className={styles.banner}>
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
    </div>
  </div>
);

export default Intro;
