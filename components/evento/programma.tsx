import styles from "./programma.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import { getEventFieldByLang } from "../../lib/wp/events";
import AppContext from "../../store/AppContext";
import { useContext } from "react";
import { getTranslation } from "../../lib/wp/translations";
const Programma = ({ evento }: { evento: any }) => {
  const context = useContext(AppContext);
  const { state } = context;

  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ""
      )}
    >
      <span className={styles.time}>
        {evento.nascondiOraInizio
          ? getTranslation(
              state?.translations,
              "testo_a_seguire",
              state?.language
            )
          : `${evento.oraInizio}`}
      </span>
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>
          {getEventFieldByLang(evento, "title", state?.language)}
        </h4>
      )}

      <div className={styles.description}>
        {parse(
          getEventFieldByLang(evento, "description", state?.language)
            ? getEventFieldByLang(evento, "description", state?.language)
            : ""
        )}
      </div>
    </div>
  );
};

export default Programma;
