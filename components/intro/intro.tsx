import styles from "./intro.module.scss";
import Image from "next/image";

const Intro = () => (
  <div className={styles.banner}>
    <Image
      src="/images/test_svg_3.svg"
      layout="fill"
      alt="Isola delle Storie 2022"
    />
  </div>
);

export default Intro;
