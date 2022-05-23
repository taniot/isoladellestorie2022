import styles from "./anteprima.module.scss";
import cls from "classnames";

const Anteprima = () => {
  return (
    <section className={styles.anteprima}>
      <div className={styles.container}>
        <h2 className={styles.title}>All’Isola delle Storie XVII</h2>
        <ul className={styles.hero_list}>
          <li className={cls(styles.hero_name, styles.color1)}>
            <span className={styles.lowLight}>Mariangela</span>{" "}
            <span className={styles.highLight}>Gualtieri</span>
            <span className={styles.trattino}>,</span>{" "}
          </li>
          <li className={cls(styles.hero_name, styles.color2)}>
            <span className={styles.lowLight}>Daria</span>{" "}
            <span className={styles.highLight}>Bignardi</span>
            <span className={styles.trattino}>,</span>{" "}
          </li>
          <li className={cls(styles.hero_name, styles.color3)}>
            <span className={styles.lowLight}>Paola</span>{" "}
            <span className={styles.highLight}>Saluzzi</span>
            <span className={styles.trattino}>,</span>{" "}
          </li>
          <li className={cls(styles.hero_name, styles.color1)}>
            <span className={styles.lowLight}>Loredana</span>{" "}
            <span className={styles.highLight}>Lipperini</span>
            <span className={styles.trattino}>,</span>{" "}
          </li>
          <li className={cls(styles.hero_name, styles.color2)}>
            <span className={styles.lowLight}>Gabriele</span>{" "}
            <span className={styles.highLight}>Romagnoli</span>
            <span className={styles.trattino}>,</span>{" "}
          </li>
          <li className={cls(styles.hero_name, styles.color3)}>
            <span className={styles.lowLight}>Jonathan</span>{" "}
            <span className={styles.highLight}>Bazzi</span>{" "}
          </li>
        </ul>
        <a href="#" className={styles.button}>
          e tanti altri presto online!
        </a>
      </div>
    </section>
  );
};

export default Anteprima;
