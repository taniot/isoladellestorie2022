import Evento from "../evento/evento";
import styles from "./eventi.module.scss";
const ProgrammaList = ({ eventi }: { eventi: any }) => {
  let current: null = null;

  return (
    <section>
      <div className="w-10/12 mx-auto">
        {eventi?.map((categoriaEvento: any) => {
          if (categoriaEvento.luogo) {
            if (current === categoriaEvento.luogo) return false;
            current = categoriaEvento.luogo;
            let result = eventi.filter((gae: any) => gae.luogo === current);
            return (
              <div key={current} className="flex justify-between mb-20">
                <div className={styles.whereContainer}>
                  <p className={styles.where}>
                    {categoriaEvento.luogoName.toUpperCase()}
                  </p>
                  <p className={styles.theme}>
                    {categoriaEvento.tipologiaName}
                  </p>
                </div>
                <div className="w-7/12">
                  {result.map((evento: any) => (
                    <Evento key={evento.id} evento={evento} />
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default ProgrammaList;
