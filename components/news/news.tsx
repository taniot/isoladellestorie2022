import styles from "./news.module.scss";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
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
          <div>
            <Link href={`/news/${data.slug}/`}>
              <a className={styles.readMore}>
                <span>Leggi di più</span>
                <ArrowNarrowRightIcon className="w-5 h-5 ml-2" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
