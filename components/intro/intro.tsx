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
        </h1>
        <h2 className={styles.subTitle}>Festival Letterario della Sardegna</h2>
      </div>
    </Div100vh>
  </>
);

export default Intro;
