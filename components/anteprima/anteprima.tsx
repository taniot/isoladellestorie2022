import styles from "./anteprima.module.scss";

const Anteprima = () => (
  <div className={styles.container}>
    <h2>In anteprima</h2>
    <ul className={styles.hero_list}>
      <li className={styles.hero_name}>Mariangela Gualtieri</li>
      <li className={styles.hero_name}>Daria Bignardi</li>
      <li className={styles.hero_name}>Paola Saluzzi</li>
      <li className={styles.hero_name}>Loredana Lipperini</li>
      <li className={styles.hero_name}>Gabriele Romagnoli</li>
      <li className={styles.hero_name}>Jonathan Bazzi</li>
      <li className={styles.hero_small}>e molti altri...</li>
    </ul>
  </div>
);

export default Anteprima;
