import { useEffect, useState } from "react";
import Evento from "../evento/evento";
import { setOreGroups } from "../../lib/wp/events";

const LaboratoriList = ({ eventi }: { eventi: any }) => {
  const [eventiGroups, setEventiGroups] = useState<any[]>([]);

  useEffect(() => {
    const groups = setOreGroups(eventi);

    setEventiGroups(groups);
  }, [eventi]);

  return (
    <div className="w-9/12 mx-auto flex flex-wrap">
      {eventi.map((evento: any) => (
        <Evento key={evento.id} evento={evento} />
      ))}
    </div>
  );
};

export default LaboratoriList;
