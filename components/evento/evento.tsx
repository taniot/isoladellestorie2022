import Laboratorio from "./laboratorio";
import Programma from "./programma";
const Evento = ({ evento }: { evento: any }) => {
  console.log({ evento });
  return (
    <>
      {evento.categoria === "laboratori" && <Laboratorio evento={evento} />}
      {evento.categoria === "programma" && <Programma evento={evento} />}
    </>
  );
};

export default Evento;
