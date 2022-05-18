import styles from "./intro.module.scss";
import Div100vh from "react-div-100vh";

const Intro = () => (
  <>
    <Div100vh className={styles.banner}>
      <div className={styles.slogan}>
        <h1 className={styles.title}>
          L’Isola delle
          <br />
          Storie
          <span className={styles.whenTitle}>
            <span className={styles.place}>Gavoi</span>
            <span className={styles.date}>01.07 - 03.07.2022</span>
          </span>
        </h1>
        <h2 className={styles.subTitle}>Festival Letterario della Sardegna</h2>
      </div>
      <div className={styles.hashTag}>
        <h3>#gavoifest2022</h3>
      </div>
    </Div100vh>
  </>
);

export default Intro;
