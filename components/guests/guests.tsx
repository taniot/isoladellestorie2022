import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

import styles from "./guests.module.scss";
import Link from "next/link";

const Guests = ({ data }) => {
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
              {posts.map((data) => (
                <div key={uuidv4()} className={styles.grid_item}>
                  <div className={styles.grid_item_inner}>
                    <Link href={`/ospiti/${data.slug}/`}>
                      <a className={styles.grid_item_link}>
                        <div className={styles.image_container}>
                          <Image
                            src={data.image}
                            alt={data.title}
                            height={500}
                            width={500}
                            priority={true}
                          />
                        </div>

                        <div className={styles.grid_item_content}>
                          <h2 className={styles.grid_item_title}>
                            {data.title}
                          </h2>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <svg
          width="1"
          height="1"
          viewBox="0 0 1 1"
          version="1.1"
          id="Calque_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath
              fill="none"
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.00182076 0.511931C-0.0173715 0.221565 0.188298 -0.000726244 0.463402 0.000708813C0.738507 0.00214387 0.978871 0.22676 0.998063 0.517126C1.01726 0.807492 0.831267 1.0008 0.556161 0.999368C0.281055 0.997933 0.0210131 0.802297 0.00182076 0.511931Z"
                fill="#FF0000"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.115067 0.214773C0.290992 -0.0118631 0.605926 -0.0679431 0.818492 0.0895185C1.03106 0.246977 1.06076 0.55835 0.88484 0.784985C0.708915 1.01162 0.393981 1.0677 0.181415 0.910243C-0.031153 0.752783 -0.0608563 0.441412 0.115067 0.214773Z"
                fill="black"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-3"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0485489 0.289262C0.189785 -0.0130123 0.58185 -0.0939925 0.831146 0.125841C1.04824 0.317278 1.03914 0.61726 0.897554 0.802762C0.760047 0.982918 0.517153 1.04904 0.306189 0.959908C0.0572244 0.854717 -0.0764779 0.556846 0.0485489 0.289262Z"
                fill="black"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-4"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.742862 0.0787588C0.983604 0.227454 1.07022 0.536486 0.936311 0.769001C0.802411 1.00152 0.498699 1.06947 0.257958 0.920775C0.0172156 0.772082 -0.0693963 0.463048 0.0645062 0.230535C0.198409 -0.00198466 0.502118 -0.0699362 0.742862 0.0787588Z"
                fill="black"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0492685 0.289291C0.190289 -0.0126931 0.581753 -0.0935957 0.830667 0.126025C1.04743 0.31728 1.03834 0.616973 0.896971 0.802298C0.759676 0.982282 0.517155 1.04834 0.306515 0.959292C0.0579321 0.854204 -0.0755651 0.556616 0.0492685 0.289291Z"
                fill="black"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0163921 0.46266C0.0779603 0.209178 0.285493 0.0332873 0.507598 0.00484646C0.754099 -0.0267163 0.977371 0.129318 0.997457 0.407735C1.02146 0.740391 0.768364 1.01173 0.438547 0.998904C0.14628 0.987544 -0.0553425 0.757999 0.0163921 0.46266Z"
                fill="#FF0000"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-7"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0219805 0.351124C0.105286 0.0785797 0.368424 -0.0475972 0.612737 0.0166647C0.86602 0.0832854 1.03115 0.329316 0.994574 0.593731C0.954322 0.884705 0.718668 1.05161 0.430083 0.983925C0.140507 0.916005 -0.0666434 0.641058 0.0219805 0.351124Z"
                fill="#FF0000"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.818224 0.124678C1.03088 0.306734 1.06097 0.622399 0.885426 0.829734C0.709884 1.03707 0.395184 1.05756 0.182527 0.875508C-0.0301321 0.693452 -0.0602215 0.377789 0.115322 0.170453C0.290864 -0.0368822 0.605565 -0.0573765 0.818224 0.124678Z"
                fill="black"
              />
            </clipPath>

            <clipPath
              className="clipPath"
              clipPathUnits="objectBoundingBox"
              id="mask-9"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.00230808 0.486999C-0.0168677 0.777102 0.188605 0.999193 0.463446 0.997758C0.738285 0.996325 0.978418 0.771913 0.997593 0.481808C1.01677 0.191705 0.830956 -0.00142764 0.556115 5.20552e-06C0.281273 0.00143805 0.021481 0.196897 0.00230808 0.486999Z"
                fill="#FF0000"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default Guests;
