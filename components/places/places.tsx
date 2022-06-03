import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setLuogoGroups } from "../../lib/wp/places";

import styles from "./places.module.scss";

const Places = ({ data }: { data: any }) => {
  const [placesGroups, setPlacesGroups] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      const groups = setLuogoGroups(data);
      setPlacesGroups(groups);
    }
  }, [data]);

  return (
    <div className="w-8/12 mx-auto my-20">
      {placesGroups.map((group: any) => {
        let places = data
          .filter((place: any) => place.city.slug === group.slug)
          .sort((a: any, b: any) => a.title.localeCompare(b.title));

        return (
          <div key={uuidv4()} className="flex mb-10">
            <div className={styles.whereContainer}>
              <p className={styles.where}>{group.luogo.toUpperCase()}</p>
              {group.distanza && (
                <p className={styles.theme}>{group.distanza} km da Gavoi</p>
              )}
            </div>

            <div className="">
              {places.map((place: any) => {
                return (
                  <div key={uuidv4()} className={styles.place}>
                    <div className={styles.title}>{place.title}</div>
                    <div>{place.address}</div>
                    <div>{place.phone1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Places;
