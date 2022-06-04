import styles from "./newsDetail.module.scss";
import parse from "html-react-parser";
import Image from "next/image";
import NewsHeader from "../newsHeader/newsHeader";
import Link from "next/link";
import { CloudDownloadIcon, DownloadIcon } from "@heroicons/react/solid";
import { BsCloudDownload } from "react-icons/bs";
import Back from "../back/back";

const NewsDetail = ({ data }: { data: any }) => {
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
                      <span>Scarica il Comunicato Stampa</span>
                      <BsCloudDownload className="w-5 h-5" />
                    </a>
                  </Link>
                </div>
              )}
              <Back link="/news/" text="Torna alle News" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
