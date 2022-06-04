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
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>{evento.title}</h4>
      )}
      <p className={styles.where}>{evento.luogoName}</p>
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
        </div>
      )}
    </div>
  );
};

export default Laboratorio;
