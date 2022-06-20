import styles from "./ospite.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { EventType } from "../../store/types";
import { format } from "date-fns";
import { getEventFieldByLang } from "../../lib/wp/events";
import AppContext from "../../store/AppContext";
import { useContext } from "react";
import { getTranslation } from "../../lib/wp/translations";
const Ospite = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext);
  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ""
      )}
    >
      <span className={styles.time}>
        {format(evento.dataOrdA, "dd/MM")} - {evento.oraInizio}
      </span>
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>
          {getEventFieldByLang(evento, "title", state?.language)}
        </h4>
      )}
      <p className={styles.where}>
        {getEventFieldByLang(evento, "luogo", state?.language)}
        {evento.tipologiaName &&
          !evento.tipologia?.includes("segnaposto") &&
          ` - ${evento.tipologiaName}`}
      </p>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "description", state?.language))}
        {getEventFieldByLang(evento, "note_eta_richiesta", state?.language)}
      </div>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "info", state?.language))}
      </div>

      <div className={styles.finanziamento}>
        {parse(getEventFieldByLang(evento, "finanziamento", state?.language))}
      </div>
      {(evento.etaRichiesta || evento.maxIscritti) && (
        <div className={styles.info}>
          <span className={styles.etaLabel}>
            {getEventFieldByLang(evento, "eta_richiesta", state?.language)}
          </span>
          <span className={styles.maxIscrittiLabel}>
            {getEventFieldByLang(evento, "max_iscritti", state?.language)}
          </span>
          {evento.prenotazioneOnline && (
            <Link
              href={getTranslation(
                state?.translations,
                "bottone_prenota_online",
                state?.language,
                "link"
              )}
            >
              <a>
                <span className={styles.prenotaOnline}>
                  {getTranslation(
                    state?.translations,
                    "bottone_prenota_online",
                    state?.language
                  )}
                </span>
              </a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Ospite;
