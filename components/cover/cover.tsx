import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import styles from "./cover.module.scss";

import Image from "next/image";

const covers = ["/cover/02.png"];

const Cover = () => {
  const [cover, setCover] = useState<string>("/cover/02.png");
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCover(covers[Math.floor(Math.random() * covers.length)]);
  }, []);

  const router = useRouter();
  return (
    <>
      <div ref={coverRef} className={styles.coverContainer}>
        <div className={styles.videoContainer}>
          <div className={styles.videoLayer}></div>
          <Image
            src={cover}
            layout="fill"
            className={styles.video}
            alt="Isola delle Storie"
          />
        </div>
        <div className={styles.claimContainer}>
          <div className={styles.claim}>
            <div className={styles.slogan}>
              <h1 className={styles.title}>L’Isola delle Storie</h1>
              <h2 className={styles.subTitle}>
                Festival Letterario della Sardegna
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
