import { useEffect, useState } from "react";

import ProgrammaList from "./programma";
import LaboratoriList from "./laboratori";
import styles from "./eventi.module.scss";
import parse from "html-react-parser";
import { EventType, Page } from "../../store/types";

const Eventi = ({ data, page }: { data: EventType[]; page: Page }) => {
  const [eventi, setEventi] = useState<EventType[]>([]);

  useEffect(() => {
    let result: EventType[] = data;
    setEventi(data);

    if (result) {
      switch (true) {
        case page?.eventi?.programma === true:
          result = result.filter((evento: EventType) => {
            return evento?.programma === true;
          });
          break;

        case page?.eventi?.categoria === "laboratorio":
          result = result.filter((evento: EventType) => {
            return (
              evento?.categoria?.toLowerCase() ===
              page.eventi?.categoria?.toLowerCase()
            );
          });
          break;

        case page?.eventi?.categoria === "mostra":
          result = result.filter((evento: EventType) => {
            return (
              evento?.categoria?.toLowerCase() ===
              page.eventi?.categoria?.toLowerCase()
            );
          });
          break;

        default:
          break;
      }

      if (page.eventi.data) {
        result = result.filter((evento) => {
          return evento.data == page.eventi.data;
        });
      }
    }

    setEventi(result);
  }, [data, page.eventi?.categoria, page.eventi.data, page.eventi?.programma]);

  return (
    <section className={styles.eventi}>
      {page.content && (
        <div className={styles.pageContentContainer}>
          <div className={styles.pageContent}>{parse(page.content)}</div>
        </div>
      )}

      <div className={styles.contentContainer}>
        {eventi && page.eventi.programma === true && (
          <ProgrammaList eventi={eventi} />
        )}
        {eventi && page.eventi.categoria === "laboratorio" && (
          <LaboratoriList eventi={eventi} />
        )}
        {eventi && page.eventi.categoria === "mostra" && (
          <LaboratoriList eventi={eventi} />
        )}
      </div>
    </section>
  );
};

export default Eventi;
