import { useEffect, useState } from "react";
import { setLuogoTipologiaGroups } from "../../lib/wp/events";
import Evento from "../evento/evento";
import styles from "./eventi.module.scss";

type EventiGroups = {
  luogo: string;
  tipologia: string;
  luogoName: string;
  tipologiaName: string;
};

const ProgrammaList = ({ eventi }: { eventi: any }) => {
  const [eventiGroups, setEventiGroups] = useState<EventiGroups[]>([]);

  useEffect(() => {
    const groups = setLuogoTipologiaGroups(eventi);

    setEventiGroups(groups);
  }, [eventi]);

  return (
    <section>
      <div className="w-8/12 mx-auto">
        {eventiGroups?.map((group, index) => {
          let result = eventi.filter(
            (evento: any) =>
              evento.luogo === group.luogo &&
              evento.tipologia === group.tipologia
          );
          return (
            <div
              key={group.luogo + index}
              className="flex justify-between mb-20"
            >
              <div className={styles.whereContainer}>
                <p className={styles.where}>{group.luogoName.toUpperCase()}</p>
                <p className={styles.theme}>{group.tipologiaName}</p>
              </div>
              <div className={styles.progContainer}>
                {result.map((evento: any) => (
                  <Evento key={evento.id} evento={evento} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProgrammaList;
