import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { EventType, Page } from "../../store/types";
import styles from "./eventi.module.scss";
import LaboratoriList from "./laboratori";
import MostraList from "./mostre";
import ProgrammaList from "./programma";

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

  const renderSwitch = () => {
    switch (true) {
      case eventi && page.eventi.programma === true:
        return <ProgrammaList eventi={eventi} />;

      case eventi && page.eventi.categoria === "laboratorio":
        return <LaboratoriList eventi={eventi} />;

      case eventi && page.eventi.categoria === "mostra":
        return <MostraList eventi={eventi} />;

      default:
        break;
    }
  };

  return (
    <section className={styles.eventi}>
      {page.content && (
        <div className={styles.pageContentContainer}>
          <div className={styles.pageContent}>{parse(page.content)}</div>
        </div>
      )}
      <div className={styles.contentContainer}>{renderSwitch()}</div>
    </section>
  );
};

export default Eventi;
