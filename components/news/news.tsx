import styles from "./news.module.scss";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
Image;
const News = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.newsContainer}>
        <div className={styles.image}>
          <div className={"image-container"}>
            {data?.featuredImage?.node?.guid && (
              <Image
                src={data.featuredImage.node.guid}
                alt={data.title}
                className={"image"}
                layout="fill"
              />
            )}
          </div>
        </div>
        <div className={styles.text}>
          <h2>{data.title}</h2>
          <div className={styles.excerpt}>{parse(data.excerpt)}</div>
        </div>
      </div>
    </div>
  );
};

export default News;
