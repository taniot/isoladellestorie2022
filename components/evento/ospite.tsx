import styles from "./ospite.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { EventType } from "../../store/types";
import { format } from "date-fns";

const Ospite = ({ evento }: { evento: EventType }) => {
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
        <h4 className={styles.title}>{evento.title}</h4>
      )}
      <p className={styles.where}>
        {evento.luogoName}
        {evento.tipologiaName &&
          !evento.tipologia?.includes("segnaposto") &&
          ` - ${evento.tipologiaName}`}
      </p>
      <div className={styles.description}>
        {parse(evento.descrizioneIt ? evento.descrizioneIt : "")}
        {evento.noteEtaRichiesta}
      </div>
      <div className={styles.description}>
        {parse(evento.infoIt ? evento.infoIt : "")}
      </div>

      <div className={styles.finanziamento}>
        {parse(evento.finanziamentoIt ? evento.finanziamentoIt : "")}
      </div>
      {(evento.etaRichiesta || evento.maxIscritti) && (
        <div className={styles.info}>
          <span className={styles.etaLabel}>{evento.etaRichiesta}</span>
          <span className={styles.maxIscrittiLabel}>{evento.maxIscritti}</span>
          {evento.prenotazioneOnline && (
            <Link href="/info-visitatori/come-fare/">
              <a>
                <span className={styles.prenotaOnline}>Prenota online</span>
              </a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Ospite;
