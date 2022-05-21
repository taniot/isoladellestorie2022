import styles from "./intro.module.scss";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Div100vh from "react-div-100vh";
const Intro = () => {
  const isSmall = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {isSmall ? (
        <Div100vh className={styles.banner}>
          <Image
            src="/images/intro-mobile.svg"
            layout="fill"
            alt="Isola delle Storie 2022"
          />
        </Div100vh>
      ) : (
        <div className={styles.banner}>
          <Image
            src="/images/intro.svg"
            layout="fill"
            alt="Isola delle Storie 2022"
          />
        </div>
      )}
    </>
  );
};

export default Intro;
