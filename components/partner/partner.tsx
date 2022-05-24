import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import styles from "../../styles/pageDefault.module.scss";
import stylesPartner from "./partner.module.scss";
import Link from "next/link";

const Partner = ({ data }: { data: any }) => {
  const sponsor = [
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
  ];

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <h2>Sostenuto da</h2>
          <div className={stylesPartner.partners}>
            {sponsor.map((partner) => (
              <div key={partner.title}>
                <a
                  href={partner.url}
                  rel="noopener"
                  className={stylesPartner.image}
                ></a>
              </div>
            ))}
          </div>
          <h2>Collaborazioni</h2>
          <div>aaaa</div>
          <h2>Con il Patrocino di</h2>
          <div>aaaa</div>
          <h2>In collaborazione con</h2>
          <div>aaaa</div>
          <h2>Sponsor Tecnici</h2>
          <div>aaaa</div>
          <h2>Media Technical Partner</h2>
          <div>aaaa</div>
        </div>
      </div>
    </>
  );
};

export default Partner;
