import { useContext, useEffect, useState } from "react";
import {
  getGroupsFieldByLang,
  setLuogoTipologiaGroups,
} from "../../lib/wp/events";

import { v4 as uuidv4 } from "uuid";
import AppContext from "../../store/AppContext";
import { EventType, EventTypeGroups } from "../../store/types";
import Programma from "../evento/programma";
import styles from "./eventi.module.scss";

const ProgrammaList = ({ eventi }: { eventi: EventType[] }) => {
  const context = useContext(AppContext);
  const { state } = context;

  const [eventiGroups, setEventiGroups] = useState<EventTypeGroups[]>([]);

  useEffect(() => {
    const groups = setLuogoTipologiaGroups(eventi);

    setEventiGroups(groups);
  }, [eventi]);

  return (
    <section>
      <div className="w-10/12 mx-auto">
        {eventiGroups?.map((group, index) => {
          let result = eventi.filter(
            (evento: EventType) =>
              evento.luogo === group.luogo &&
              evento.tipologia === group.tipologia
          );
          return (
            <div key={uuidv4()} className={styles.eventContainer}>
              <div className={styles.whereContainer}>
                <p className={styles.where}>
                  {getGroupsFieldByLang(
                    group,
                    "luogo",
                    state?.language
                  ).toUpperCase()}
                </p>
                <p className={styles.theme}>
                  {" "}
                  {getGroupsFieldByLang(
                    group,
                    "tipologia",
                    state?.language
                  ).toUpperCase()}
                </p>
              </div>
              <div className={styles.progContainer}>
                {result?.map((evento: EventType) => (
                  <Programma key={evento.id} evento={evento} />
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
