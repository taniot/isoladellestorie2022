import { MailIcon, PhoneIcon, PhoneOutgoingIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { setLuogoGroups } from "../../lib/wp/places";

import styles from "./places.module.scss";
import Link from "next/link";

const Places = (info: any) => {
  const { data, page } = info;
  const [placesGroups, setPlacesGroups] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      const groups = setLuogoGroups(data);
      setPlacesGroups(groups);
    }
  }, [data]);

  return (
    <div className="w-9/12 mx-auto my-20">
      {placesGroups.map((group: any) => {
        let places = data
          .filter((place: any) => place.city.slug === group.slug)
          .sort((a: any, b: any) => a.title.localeCompare(b.title));

        return (
          <div key={uuidv4()} className="flex flex-col  mb-10">
            <div className={styles.whereContainer}>
              <p className={styles.where}>{group.luogo.toUpperCase()}</p>
              {group.distanza && (
                <p className={styles.theme}>{group.distanza} km da Gavoi</p>
              )}
            </div>

            <div className={styles.placesContainer}>
              {places.map((place: any) => {
                return (
                  <div key={uuidv4()} className={styles.place}>
                    <div className={styles.placeBox}>
                      <div className={styles.title}>{place.title}</div>
                      <div className={styles.description}>{place.address}</div>
                      <div className={styles.icons}>
                        {place.phone1 && (
                          <a href={`tel:${place.phone1}`}>
                            <div className={styles.icon}>
                              <BsFillTelephoneFill className="w-4 h-4" />
                            </div>
                          </a>
                        )}

                        {place.email && (
                          <a
                            href={`mailto:${place.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className={styles.icon}>
                              <MailIcon className="w-4 h-4" />
                            </div>
                          </a>
                        )}
                        {place.web && (
                          <a
                            href={`${place.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className={styles.icon}>
                              <BiWorld className="w-4 h-4" />
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
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
