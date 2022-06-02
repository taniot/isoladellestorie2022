import Evento from "../evento/evento";

const LaboratoriList = ({ eventi }: { eventi: any }) => {
  return (
    <div className="w-9/12 mx-auto flex flex-wrap">
      {eventi.map((evento: any) => (
        <Evento key={evento.id} evento={evento} />
      ))}
    </div>
  );
};

export default LaboratoriList;
