import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./guests.module.scss";
import Link from "next/link";
import GuestImage from "./image";

const Guests = ({ data }: { data: any }) => {
  const [posts, setPosts] = useState(data.slice(0, 8));
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = data.slice(posts.length, posts.length + 8);
    if (!res) setHasMore(false);
    setPosts((posts: any) => [...posts, ...res]);
  };

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={hasMore}
            loader={<></>}
            endMessage={<h4>Nothing more to show</h4>}
          >
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
                        <GuestImage title={data.title} image={data.image} />

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
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Guests;
