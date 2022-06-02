import styles from "./programma.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";
const Programma = ({ evento }: { evento: any }) => (
  <div
    className={classNames(
      styles.evento,
      evento.eventoPrincipale ? styles.main : ""
    )}
  >
    <span className={styles.time}>
      {evento.nascondiOraInizio ? "a seguire" : `ore ${evento.oraInizio}`}
    </span>
    <h4 className={styles.title}>{evento.title}</h4>
    <div className={styles.description}>
      {parse(evento.descrizioneIt ? evento?.descrizioneIt?.trim() : "")}
    </div>
  </div>
);

export default Programma;
