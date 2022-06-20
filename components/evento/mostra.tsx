import classNames from "classnames";
import parse from "html-react-parser";
import styles from "./mostra.module.scss";
import { useContext } from "react";
import { getEventFieldByLang } from "../../lib/wp/events";
import AppContext from "../../store/AppContext";
import { EventType } from "../../store/types";
const Mostra = ({ evento }: { evento: EventType }) => {
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
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "description", state?.language))}
        {getEventFieldByLang(evento, "note_eta_richiesta", state?.language)}
      </div>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, "info", state?.language))}
      </div>
      <div className={styles.moreInfo}>
        {parse(getEventFieldByLang(evento, "approfondimento", state?.language))}
      </div>
      <div className={styles.close}></div>
    </div>
  );
};

export default Mostra;
