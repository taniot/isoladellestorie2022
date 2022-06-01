import styles from "./eventi.module.scss";
import parse from "html-react-parser";
import classNames from "classnames";
const Eventi = (eventi: any) => {
  const { data } = eventi;
  let current: null = null;

  if (data.length === 0) return <div>Loading...</div>;

  return (
    <>
      <div className="w-9/12 mx-auto">
        {data.map((categoriaEvento: any) => {
          if (categoriaEvento.luogo) {
            if (current === categoriaEvento.luogo) return false;
            current = categoriaEvento.luogo;
            let result = data.filter((gae: any) => gae.luogo === current);
            return (
              <div key={current} className="flex justify-between mb-20">
                <div className={styles.whereContainer}>
                  <p className={styles.where}>
                    {categoriaEvento.luogo.toUpperCase()}
                  </p>
                  <p className={styles.theme}>{categoriaEvento.tipologia}</p>
                </div>
                <div className="w-8/12">
                  {result.map((evento: any) => (
                    <div
                      key={evento.id}
                      className={classNames(
                        styles.evento,
                        evento.eventoPrincipale ? styles.main : ""
                      )}
                    >
                      <span className={styles.time}>
                        {evento.nascondiOraInizio
                          ? "a seguire"
                          : `ore ${evento.oraInizio}`}
                      </span>
                      <h4 className={styles.title}>{evento.title}</h4>
                      <div className={styles.description}>
                        {parse(
                          evento.descrizioneIt ? evento.descrizioneIt : ""
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Eventi;
