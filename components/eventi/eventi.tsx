import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import ProgrammaList from "./programma";
import LaboratoriList from "./laboratori";
import styles from "./eventi.module.scss";
import parse from "html-react-parser";

const Eventi = (info: any) => {
  const { data, page } = info;
  const context = useContext(AppContext);
  const { state } = context;

  const [eventi, setEventi] = useState<any[] | undefined>([]);

  useEffect(() => {
    let result: any[] | undefined = state?.events;

    if (result) {
      if (data.categoria) {
        result = result.filter((evento) => {
          return (
            evento?.categoria?.toLowerCase() === data?.categoria?.toLowerCase()
          );
        });
      }
      if (data.data) {
        result = result.filter((evento) => {
          return evento.data == data.data;
        });
      }
    }

    setEventi(result);
  }, [data.data, data.categoria, info, state?.events]);

  return (
    <section className={styles.eventi}>
      {page.content && (
        <div className={styles.pageContentContainer}>
          <div className={styles.pageContent}>{parse(page.content)}</div>
        </div>
      )}

      <div className={styles.contentContainer}>
        {data.categoria === "programma" && <ProgrammaList eventi={eventi} />}
        {data.categoria === "laboratori" && <LaboratoriList eventi={eventi} />}
      </div>
    </section>
  );
};

export default Eventi;
