import styles from "./programma.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import { getEventFieldByLang } from "../../lib/wp/events";
import AppContext from "../../store/AppContext";
import { useContext } from "react";
import { getTranslation } from "../../lib/wp/translations";
import { EventType } from "../../store/types";
import { BsHandIndexThumb } from "react-icons/bs";
const Programma = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext);

  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : "",
        evento.eventoAnnullato && styles.annullato
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

      <div
        className={classNames(
          styles.description,
          evento.nascondiTitolo && styles.noTitle
        )}
      >
        {parse(
          getEventFieldByLang(evento, "description", state?.language)
            ? getEventFieldByLang(evento, "description", state?.language)
            : ""
        )}
      </div>
      {evento.eventoAnnullato && (
        <div className={styles.annullatoMessage}>
          <BsHandIndexThumb className={styles.icon} />
          <span className={styles.text}>
            {getEventFieldByLang(evento, "annullato", state?.language)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Programma;
