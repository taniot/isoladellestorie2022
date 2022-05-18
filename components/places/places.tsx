import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./places.module.scss";

const Places = ({ data }: { data: any }) => {
  const [posts, setPosts] = useState(data.slice(0, 9));
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = data.slice(posts.length, posts.length + 9);
    console.log({ data });
    console.log({ res });
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
            loader={<h3></h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            <div className={styles.grid_list}>
              {posts.map((data: any) => (
                <div key={uuidv4()} className={styles.grid_item}>
                  <div className={styles.grid_item_inner}>
                    <div className={styles.grid_item_content}>
                      <h2 className={styles.grid_item_title}>{data.title}</h2>
                      <p>{data.address}</p>
                      <p>{data.city}</p>
                      <p>{data.email.toLowerCase()}</p>
                      <p>{data.phone1}</p>
                      <p>{data.phone2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Places;
