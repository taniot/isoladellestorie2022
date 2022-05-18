import styles from "../../styles/pageDefault.module.scss";

const Ospite = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeader}>
          <h1>Nome Ospite</h1>
        </div>
      </div>

      <section className={styles.sectionContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.pageContentContainer}></div>
        </div>
      </section>
    </div>
  );
};

export default Ospite;
