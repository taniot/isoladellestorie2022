import { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import ProgrammaList from "./programma";
import LaboratoriList from "./laboratori";

const Eventi = (info: any) => {
  const { data } = info;
  const context = useContext(AppContext);
  const { state, setLoading } = context;

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
      console.log({ result });
      if (data.data) {
        result = result.filter((evento) => {
          return evento.data == data.data;
        });
      }
      console.log({ result });
    }

    setEventi(result);
  }, [data.data, data.categoria, info, setLoading, state?.events]);

  return (
    <>
      {data.categoria === "programma" && <ProgrammaList eventi={eventi} />}
      {data.categoria === "laboratori" && <LaboratoriList eventi={eventi} />}
    </>
  );
};

export default Eventi;
