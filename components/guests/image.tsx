import styles from "./image.module.scss";
import Image from "next/image";
import { FC } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface GuestImg {
  title: string;
  image?: string | null;
  width?: number;
  height?: number;
  borderColor?: string;
}

const GuestImage: FC<GuestImg> = (props) => {
  const isMobile = useMediaQuery("(max-width: 639px)");

  const {
    title,
    image,
    width = isMobile ? 150 : 200,
    height = isMobile ? 150 : 200,
    borderColor = "#fff",
  } = props;

  return (
    <div className={styles.borderContainer} style={{ borderColor }}>
      <div className={styles.image_container} style={{ width, height }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            priority={true}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        ) : (
          <div className={styles.noImage}>
            <Image
              src="/images/l-isola-delle-storie-favicon-light.svg"
              alt={title}
              priority={true}
              width="100px"
              height="100px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestImage;
