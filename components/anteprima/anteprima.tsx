import styles from "./anteprima.module.scss";
import cls from "classnames";

const Anteprima = () => (
  <section className={styles.anteprima}>
    <div className={styles.container}>
      <h2 className={styles.title}>Anteprima Ospiti XVII</h2>
      <ul className={styles.hero_list}>
        <li className={cls(styles.hero_name, styles.color1)}>
          Mariangela Gualtieri<span className={styles.trattino}>,</span>{" "}
        </li>
        <li className={cls(styles.hero_name, styles.color2)}>
          Daria Bignardi<span className={styles.trattino}>,</span>{" "}
        </li>
        <li className={cls(styles.hero_name, styles.color3)}>
          Paola Saluzzi<span className={styles.trattino}>,</span>{" "}
        </li>
        <li className={cls(styles.hero_name, styles.color1)}>
          Loredana Lipperini<span className={styles.trattino}>,</span>{" "}
        </li>
        <li className={cls(styles.hero_name, styles.color2)}>
          Gabriele Romagnoli<span className={styles.trattino}>,</span>{" "}
        </li>
        <li className={cls(styles.hero_name, styles.color3)}>
          Jonathan Bazzi{" "}
        </li>
      </ul>
      <a href="#" className={styles.button}>
        e tanti altri presto online!
      </a>
    </div>
  </section>
);

export default Anteprima;
