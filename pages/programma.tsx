import styles from "../styles/pageDefault.module.scss";
import stylesEventi from "../components/eventi/eventi.module.scss";

import Eventi from "../components/eventi/eventi";

import { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import SelectDay from "../components/selectDay/selectDay";

const PageProgramma = () => {
  const context = useContext(AppContext);
  const { state } = context;

  const [programma, setProgramma] = useState<any[]>([]);

  useEffect(() => {
    if (state && state.events.length > 0) {
      setProgramma(state.events);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.events]);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeaderContainer}>
          <div className={styles.pageHeader}>
            <div className={styles.titleContainer}>
              <h1>Programma</h1>
            </div>
          </div>
        </div>
        <section className={styles.sectionContainer}>
          <div className={styles.contentContainer}>
            <SelectDay />
            <Eventi data={programma} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PageProgramma;
