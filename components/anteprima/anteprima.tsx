import styles from "./anteprima.module.scss";
import cls from "classnames";
import Link from "next/link";

const Anteprima = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.hero_list}>
        <li className={cls(styles.hero_name, styles.color1)}>
          <Link href="/ospiti/mariangela-gualtieri/">
            <a>
              <span className={styles.lowLight}>Mariangela</span>{" "}
              <span className={styles.highLight}>Gualtieri</span>
            </a>
          </Link>
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
          <Link href="/ospiti/jonathan-bazzi/">
            <a>
              <span className={styles.lowLight}>Jonathan</span>{" "}
              <span className={styles.highLight}>Bazzi</span>{" "}
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Anteprima;
