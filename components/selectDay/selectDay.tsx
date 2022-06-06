import styles from "./selectDay.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { getTranslation } from "../../lib/wp/translations";
import AppContext from "../../store/AppContext";

const SelectDay = ({ page }: { page: any }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const [daysEventi, setDaysEventi] = useState([]);

  useEffect(() => {
    const sortedChildren = (children: any) => {
      return children.sort(
        (a: any, b: any) => Date.parse(a.dateEventi) - Date.parse(b.dateEventi)
      );
    };

    setDaysEventi(sortedChildren(page?.parent?.children));
  }, [daysEventi, page.parent]);

  return (
    <div className={styles.giorniFestival}>
      <ul>
        {daysEventi.map((day: any, index: number) => {
          const date = new Date(day.dateEventi);
          return (
            <li key={index}>
              <Link href={day.uri}>
                <a>
                  <span
                    className={classNames(
                      styles.dayNumber,
                      day.dateEventi === page.eventi.data && styles.active
                    )}
                  >
                    {date.getDate() >= 10
                      ? date.getDate()
                      : `0` + date.getDate()}
                    /
                    {date.getMonth() >= 10
                      ? date.getMonth() + 1
                      : `0` + (date.getMonth() + 1)}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <h4>
        {getTranslation(
          state?.translations,
          "giorni_festival",
          state?.language
        )}
      </h4>
    </div>
  );
};

export default SelectDay;
