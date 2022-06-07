import styles from "./anteprima.module.scss";
import cls from "classnames";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import { getTranslation } from "../../lib/wp/translations";

const Anteprima = ({ data }: { data: any }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const [anteprima, setAnteprima] = useState<any[]>([]);

  useEffect(() => {
    const randomGuests = () => {
      if (data && data.length > 0) {
        const shuffled = data
          .filter((ospite: any) => ospite.nome && ospite.cognome)
          .sort(() => 0.5 - Math.random());

        setAnteprima(shuffled.slice(0, 5));
      }
    };

    //setInterval(randomGuests, 5000);

    randomGuests();
  }, [data]);

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
                  <Link
                    href={`${getTranslation(
                      state?.translations,
                      "menu_ospiti",
                      state?.language,
                      "link"
                    )}${ospite.slug}/`}
                  >
                    <a>
                      <span className={styles.lowLight}>{ospite.nome}</span>{" "}
                      <span className={styles.highLight}>
                        {ospite.cognome}
                        {index + 1 !== anteprima.length && (
                          <span className={styles.trattino}>,</span>
                        )}{" "}
                      </span>
                    </a>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Anteprima;
