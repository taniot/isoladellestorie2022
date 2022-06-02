import styles from "./laboratorio.module.scss";
import classNames from "classnames";
import parse from "html-react-parser";

const Laboratorio = ({ evento }: { evento: any }) => {
  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ""
      )}
    >
      <span className={styles.time}>
        {evento.nascondiOraInizio ? "a seguire" : `ore ${evento.oraInizio}`}
        {evento.oraFine && ` - ${evento.oraFine}`}
      </span>
      <h4 className={styles.title}>{evento.title}</h4>
      <div className={styles.description}>
        {parse(evento.descrizioneIt ? evento.descrizioneIt : "")}
      </div>
      <div className={styles.description}>
        {parse(evento.infoIt ? evento.infoIt : "")}
      </div>

      <div className={styles.description}>
        {parse(evento.finanziamentoIt ? evento.finanziamentoIt : "")}
      </div>
    </div>
  );
};

export default Laboratorio;
