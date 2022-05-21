import styles from "./anteprima.module.scss";

const Anteprima = () => (
  <section className={styles.anteprima}>
    <div className={styles.container}>
      <h2 className={styles.title}>In questa edizione</h2>
      <ul className={styles.hero_list}>
        <li className={styles.hero_name}>
          Mariangela Gualtieri <span className={styles.trattino}>-</span>{" "}
        </li>
        <li className={styles.hero_name}>
          Daria Bignardi <span className={styles.trattino}>-</span>{" "}
        </li>
        <li className={styles.hero_name}>
          Paola Saluzzi <span className={styles.trattino}>-</span>{" "}
        </li>
        <li className={styles.hero_name}>
          Loredana Lipperini <span className={styles.trattino}>-</span>{" "}
        </li>
        <li className={styles.hero_name}>
          Gabriele Romagnoli <span className={styles.trattino}>-</span>{" "}
        </li>
        <li className={styles.hero_name}>Jonathan Bazzi </li>
      </ul>
      <a href="#" className={styles.button}>
        e molti altri presto online
      </a>
    </div>
  </section>
);

export default Anteprima;
