import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./guests.module.scss";
import Link from "next/link";
import GuestImage from "./image";

const Guests = (info: any) => {
  const { data, page } = info;
  const [posts, setPosts] = useState(data);

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <div className={styles.grid_list}>
            {posts.map(
              (data: {
                title: string;
                image: string;
                slug: string;
                tagLine: string;
              }) => (
                <div key={uuidv4()} className={styles.grid_item}>
                  <Link href={`/ospiti/${data.slug}/`}>
                    <a className={styles.grid_item_link}>
                      <GuestImage
                        title={data.title}
                        image={data.image}
                        borderColor="#e6cd00"
                      />

                      <h2 className={styles.grid_item_title}>{data.title}</h2>
                      <p className={styles.grid_item_description}>
                        {data.tagLine}
                      </p>
                    </a>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guests;
