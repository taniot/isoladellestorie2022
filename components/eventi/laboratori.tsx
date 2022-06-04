import { useEffect, useState } from "react";
import Evento from "../evento/evento";
import { setOreGroups } from "../../lib/wp/events";
import styles from "./eventi.module.scss";
import { v4 as uuidv4 } from "uuid";

const LaboratoriList = ({ eventi }: { eventi: any }) => {
  const [eventiGroups, setEventiGroups] = useState<any[]>([]);

  useEffect(() => {
    const groups = setOreGroups(eventi);
    setEventiGroups(groups);
  }, [eventi]);

  return (
    <div className="w-10/12 mx-auto">
      {eventiGroups?.map((group, index) => {
        let result = eventi?.filter(
          (evento: any) =>
            evento.oraInizio === group.oraInizio &&
            evento.oraFine === group.oraFine
        );
        return (
          <div key={uuidv4()} className={styles.eventContainer}>
            <div className={styles.timeContainer}>
              <p className={styles.mainTime}>
                {group.oraInizio}
                {group.oraFine && ` - ${group.oraFine}`}
              </p>
            </div>
            <div className={styles.labContainer}>
              {result.map((evento: any) => (
                <Evento key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaboratoriList;
