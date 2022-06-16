import styles from "./mostra.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
import Link from "next/link";
import { EventType } from "../../store/types";

const Mostra = ({ evento }: { evento: EventType }) => {
  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ""
      )}
    >
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>{evento.title}</h4>
      )}
      <div className={styles.description}>
        {parse(evento.descrizioneIt ? evento.descrizioneIt : "")}
        {evento.noteEtaRichiesta}
      </div>
      <div className={styles.description}>
        {parse(evento.infoIt ? evento.infoIt : "")}
      </div>
      <div className={styles.moreInfo}>
        {parse(evento.approfondimentoIt ? evento.approfondimentoIt : "")}
      </div>
      <div className={styles.close}></div>
    </div>
  );
};

export default Mostra;
