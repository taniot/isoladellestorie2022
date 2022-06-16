import { EventType } from "../../store/types";
import Laboratorio from "./laboratorio";
import Ospite from "./ospite";
import Programma from "./programma";
const Evento = ({
  evento,
  guest = false,
}: {
  evento: EventType;
  guest?: boolean;
}) => {
  return (
    <>
      {guest === true && <Ospite evento={evento} />}

      {evento.categoria === "laboratorio" && guest === false && (
        <Laboratorio evento={evento} />
      )}
      {evento.programma === true && guest === false && (
        <Programma evento={evento} />
      )}
    </>
  );
};

export default Evento;
