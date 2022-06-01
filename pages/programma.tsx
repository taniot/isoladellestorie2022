import styles from "../styles/pageDefault.module.scss";
import stylesEventi from "../components/eventi/eventi.module.scss";

import Eventi from "../components/eventi/eventi";

import { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import SelectDay from "../components/selectDay/selectDay";

const days = [
  {
    id: 1,
    day: "2022-06-22",
    textIT: "Mercoledì 22 Giugno",
    unavailable: false,
  },
  {
    id: 2,
    day: "2022-07-01",
    textIT: "Venerdì 1 Luglio",
    unavailable: false,
  },
  {
    id: 3,
    day: "2022-07-02",
    textIT: "Sabato 2 Luglio",
    unavailable: false,
  },
  {
    id: 4,
    day: "2022-07-03",
    textIT: "Domenica 3 Luglio",
    unavailable: false,
  },
];

const PageProgrammaZ = () => {
  const context = useContext(AppContext);
  const { state } = context;

  const [selectedDay, setSelectedDay] = useState(days[0]);

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
              <SelectDay
                days={days}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            </div>
          </div>
        </div>
        <section className={styles.sectionContainer}>
          <div className={styles.contentContainer}>
            <Eventi data={programma} day={selectedDay} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PageProgrammaZ;
