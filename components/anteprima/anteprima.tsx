import styles from "./anteprima.module.scss";

const Anteprima = () => (
  <section className={styles.anteprima}>
    <div className={styles.container}>
      <h2 className={styles.title}>In questa edizione</h2>
      <ul className={styles.hero_list}>
        <li className={styles.hero_name}>Mariangela Gualtieri, </li>
        <li className={styles.hero_name}>Daria Bignardi, </li>
        <li className={styles.hero_name}>Paola Saluzzi, </li>
        <li className={styles.hero_name}>Loredana Lipperini, </li>
        <li className={styles.hero_name}>Gabriele Romagnoli, </li>
        <li className={styles.hero_name}>Jonathan Bazzi </li>
      </ul>
    </div>
  </section>
);

export default Anteprima;
