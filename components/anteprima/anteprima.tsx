import styles from "./anteprima.module.scss";
import cls from "classnames";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";

const Anteprima = () => {
  const context = useContext(AppContext);
  const { state } = context;

  const [anteprima, setAnteprima] = useState<any[]>([]);

  useEffect(() => {
    const randomGuests = () => {
      if (state && state.guests.length > 0) {
        const shuffled = state.guests
          .filter((ospite) => ospite.nome && ospite.cognome)
          .sort(() => 0.5 - Math.random());

        setAnteprima(shuffled.slice(0, 5));
      }
    };

    //setInterval(randomGuests, 5000);

    randomGuests();
  }, [state]);

  return (
    <div className={styles.container}>
      {anteprima.length > 0 ? (
        <ul className={styles.hero_list}>
          {anteprima.map((ospite, index) => {
            if (ospite.nome && ospite.cognome) {
              return (
                <li
                  key={ospite.title}
                  className={cls(styles.hero_name, styles.color2)}
                >
                  <a href="#">
                    <span className={styles.lowLight}>{ospite.nome}</span>{" "}
                    <span className={styles.highLight}>{ospite.cognome}</span>
                    {index + 1 !== anteprima.length && (
                      <span className={styles.trattino}>,</span>
                    )}{" "}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <div>nessun ospite</div>
      )}
    </div>
  );
};

export default Anteprima;
