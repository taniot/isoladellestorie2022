import { EventType } from "../../store/types";
import Laboratorio from "./laboratorio";
import Programma from "./programma";
const Evento = ({ evento }: { evento: EventType }) => {
  return (
    <>
      {evento.categoria === "laboratori" && <Laboratorio evento={evento} />}
      {evento.categoria === "programma" && <Programma evento={evento} />}
    </>
  );
};

export default Evento;
