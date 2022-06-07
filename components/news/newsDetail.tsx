import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { BsCloudDownload } from "react-icons/bs";
import Back from "../back/back";
import NewsHeader from "../newsHeader/newsHeader";
import styles from "./newsDetail.module.scss";
import { getTranslation } from "../../lib/wp/translations";
import { useContext } from "react";
import AppContext from "../../store/AppContext";

const NewsDetail = ({ data }: { data: any }) => {
  const context = useContext(AppContext);
  const { state } = context;
  if (!data) return null;

  return (
    <>
      <div className={styles.pageContainer}>
        <NewsHeader page={data} />
        <div className={styles.container}>
          <div className={styles.newsContainer}>
            <div className={styles.text}>
              <div className={styles.intro}>
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
                <div className={styles.excerpt}>{parse(data.excerpt)}</div>
              </div>
              {data?.content && (
                <div className={styles.content}>{parse(data.content)}</div>
              )}

              {data.dettagliArticoli?.comunicatoStampa?.guid && (
                <div className={styles.download}>
                  <Link href={data.dettagliArticoli?.comunicatoStampa?.guid}>
                    <a target="_blank" rel="noopener noreferrer">
                      <span>
                        {getTranslation(
                          state?.translations,
                          "download_comunicato",
                          state?.language
                        )}
                      </span>
                      <BsCloudDownload className="w-5 h-5" />
                    </a>
                  </Link>
                </div>
              )}
              <Back
                link={getTranslation(
                  state?.translations,
                  "bottone_back_news",
                  state?.language,
                  "link"
                )}
                text={getTranslation(
                  state?.translations,
                  "bottone_back_news",
                  state?.language
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
