import styles from "./intro.module.scss";

const Intro = () => (
  <>
    <div className={styles.banner}>
      <div className={styles.slogan}>
        <h1 className={styles.title}>
          L’Isola delle
          <br />
          Storie
        </h1>
        <h2 className={styles.subTitle}>Festival Letterario della Sardegna</h2>
      </div>
    </div>
  </>
);

export default Intro;
