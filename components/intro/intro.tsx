import styles from "./intro.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
const Intro = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {isMobile && (
        <div className={styles.banner}>
          <div className={styles.device}>mobile</div>
          <div className={styles.headerSpace}></div>
          <div className={styles.sloganSpace}>
            <div className={styles.slogan}>
              <Image
                layout="fill"
                src="/images/test_svg_mobile13.svg"
                alt="Isola delle Storie 2022"
              />
            </div>
          </div>
          <div className={styles.imageSpace}>
            <Image
              src="/images/donna-isola-storie.png"
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
            src="/images/intro-test.svg"
            layout="fill"
            alt="Isola delle Storie 2022"
            objectFit="contain"
            objectPosition="center bottom"
          />
        </div>
      )}
      {isDesktop && (
        <div className={styles.banner}>
          <div className={styles.device}>desktop</div>
          <Image
            src="/images/intro-test.svg"
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
