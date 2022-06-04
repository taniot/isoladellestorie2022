import styles from "./guest.module.scss";
import parse from "html-react-parser";
import GuestImage from "../guests/image";
import cls from "classnames";
import Back from "../back/back";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useEffect, useState } from "react";

const Guest = ({ guest }: { guest: any }) => {
  const isMobile = useMediaQuery("(max-width: 639px)");

  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    const doMagic = (guest: any) => {
      const result = guest.eventi.map((evento: any) => {
        return evento.dettaglioEvento.dataEvento;
      });

      return result;
    };

    setDays(doMagic(guest));
  }, [guest]);

  return (
    <section className={styles.guest}>
      <div className={styles.guestContentContainer}>
        <div className={styles.guestHeader}>
          <div className={styles.image}>
            <GuestImage
              title={guest.title}
              image={guest.image}
              width={isMobile ? 200 : 280}
              height={isMobile ? 200 : 280}
            />
          </div>

          {guest.nome && guest.cognome ? (
            <>
              <h2>
                <span className={styles.nome}>{guest.nome}</span>{" "}
                <span className={styles.cognome}>{guest.cognome}</span>
              </h2>
              <h3>{guest.jobTitleIt}</h3>
            </>
          ) : (
            <>
              <h2 className={styles.nomeLungo}>{guest.title}</h2>
              <h3>{guest.jobTitleIt}</h3>
            </>
          )}
          <div className={styles.giorniFestival}>
            <ul>
              <li>
                <span
                  className={cls(
                    styles.dayNumber,
                    days.includes("2022-06-22") && styles.active
                  )}
                >
                  22/06
                </span>
              </li>
              <li>
                <span
                  className={cls(
                    styles.dayNumber,
                    days.includes("2022-07-01") && styles.active
                  )}
                >
                  01/07
                </span>
              </li>
              <li>
                <span
                  className={cls(
                    styles.dayNumber,
                    days.includes("2022-07-02") && styles.active
                  )}
                >
                  02/07
                </span>
              </li>
              <li>
                <span
                  className={cls(
                    styles.dayNumber,
                    days.includes("2022-07-03") && styles.active
                  )}
                >
                  03/07
                </span>
              </li>
            </ul>
            <h4>I giorni del festival</h4>
          </div>
        </div>
        <div className={styles.guestBody}>
          <div className={styles.text}>
            {parse(guest.descrizioneIt ? guest.descrizioneIt : "")}
          </div>
          <Back link="/ospiti/" text="Torna agli Ospiti" />
        </div>
      </div>
    </section>
  );
};

export default Guest;
