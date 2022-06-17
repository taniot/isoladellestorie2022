import styles from "./laboratorio.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { EventType } from "../../store/types";
import AppContext from "../../store/AppContext";
import { useContext } from "react";
import { getTranslation } from "../../lib/wp/translations";
import { getEventFieldByLang } from "../../lib/wp/events";
const Laboratorio = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext);
  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ""
      )}
    >
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>
          {getEventFieldByLang(evento, "title", state?.language)}
        </h4>
      )}
      <p className={styles.where}>
        {getEventFieldByLang(evento, "luogo", state?.language)}
      </p>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "description", state?.language))}
        {evento.noteEtaRichiesta}
      </div>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "info", state?.language))}
      </div>

      <div className={styles.finanziamento}>
        {parse(getEventFieldByLang(evento, "finanziamento", state?.language))}
      </div>
      {(evento.etaRichiesta || evento.maxIscritti) && (
        <div className={styles.info}>
          <span className={styles.etaLabel}>{evento.etaRichiesta}</span>
          <span className={styles.maxIscrittiLabel}>{evento.maxIscritti}</span>
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

export default Laboratorio;
