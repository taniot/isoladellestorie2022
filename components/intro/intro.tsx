import styles from "./intro.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
const Intro = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <h1 className="hidden">L’Isola delle Storie</h1>
      <h2 className="hidden">Festival Letterario della Sardegna</h2>
      <h3 className="hidden">01.07 - 03.07.2022</h3>
      {isMobile && (
        <div className={styles.banner}>
          <div className={styles.device}>mobile</div>
          <div className={styles.headerSpace}></div>
          <div className={styles.sloganSpace}>
            <div className={styles.slogan}>
              <Image
                layout="fill"
                src="/images/intro-mobile-top.svg"
                alt="Isola delle Storie 2022"
                priority
              />
            </div>
          </div>
          <div className={styles.imageSpace}>
            <Image
              src="/images/intro-mobile-bottom.png"
              alt="Isola delle Storie 2022"
              layout="fill"
              objectFit="contain"
              objectPosition="center bottom"
              priority
            />
          </div>
        </div>
      )}

      {isTablet && (
        <div className={styles.banner}>
          <div className={styles.device}>tablet</div>
          <Image
            src="/images/intro-desktop.png"
            layout="fill"
            alt="Isola delle Storie 2022"
            objectFit="contain"
            objectPosition="center bottom"
            priority
          />
        </div>
      )}
      {isDesktop && (
        <div className={styles.banner}>
          <div className={styles.device}>desktop</div>
          <Image
            src="/images/intro-desktop.png"
            layout="fill"
            alt="Isola delle Storie 2022"
            objectFit="contain"
            objectPosition="center bottom"
          />
        </div>
      )}
    </>
  );
};

export default Intro;
