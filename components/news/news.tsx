import styles from "./news.module.scss";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
Image;
const News = ({ data }) => {
  if (!data) return null;

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h2 className={styles.title}>Succede all’Isola XVII</h2>
        <div className={styles.newsContainer}>
          <div className={styles.image}>
            <Image
              src={data[0].featuredImage.node.guid}
              width={530}
              height={400}
              alt={data[0].title}
            />
          </div>
          <div className={styles.text}>
            <h2>{data[0].title}</h2>
            <div className={styles.excerpt}>{parse(data[0].excerpt)}</div>
          </div>
        </div>

        <Link href="/news/">
          <a className={styles.button}>Leggi tutte le news</a>
        </Link>
      </div>
    </section>
  );
};

export default News;
