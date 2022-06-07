import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./guests.module.scss";
import Link from "next/link";
import GuestImage from "./image";
import { getGuestFieldByLang } from "../../lib/wp/guests";
import AppContext from "../../store/AppContext";
import { getTranslation } from "../../lib/wp/translations";
import { Guest } from "../../store/types";
const Guests = (info: any) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, page } = info;
  const [posts, setPosts] = useState(data);

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <div className={styles.grid_list}>
            {posts?.map((data: Guest) => (
              <div key={uuidv4()} className={styles.grid_item}>
                <Link
                  href={`${getTranslation(
                    state?.translations,
                    "menu_ospiti",
                    state?.language,
                    "link"
                  )}${data.slug}/`}
                >
                  <a className={styles.grid_item_link}>
                    <GuestImage
                      title={data.title}
                      image={data.image}
                      borderColor="#e6cd00"
                    />

                    <h2 className={styles.grid_item_title}>{data.title}</h2>
                    <p className={styles.grid_item_description}>
                      {getGuestFieldByLang(data, "jobTitle", state?.language)}
                    </p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guests;
