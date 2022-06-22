import styles from "./newsLight.module.scss";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { getTranslation } from "../../lib/wp/translations";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import { wpNews } from "../../store/types";

const NewsLight = ({ data }: { data: wpNews }) => {
  const context = useContext(AppContext);
  const { state } = context;
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
          {data?.featuredImage?.node?.caption && (
            <div className={styles.caption}>
              {parse(data?.featuredImage?.node?.caption || "")}
            </div>
          )}
        </div>
        <div className={styles.text}>
          <Link href={`/news/${data.slug}/`} locale={data.language.slug}>
            <a>
              <h2>{data.title}</h2>
            </a>
          </Link>
          {data?.excerpt && (
            <div className={styles.excerpt}>{parse(data?.excerpt || "")}</div>
          )}

          <Link href={`/news/${data.slug}/`}>
            <a className={styles.readMore}>
              <span>
                {getTranslation(
                  state?.translations,
                  "read_more",
                  state?.language
                )}
              </span>
              <ArrowNarrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsLight;
