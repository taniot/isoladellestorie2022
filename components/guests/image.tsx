import styles from "./image.module.scss";
import Image from "next/image";
import { FC } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface GuestImg {
  title: string;
  image?: string;
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
            objectFit="cover"
            objectPosition="top"
          />
        ) : (
          <div className={styles.noImage}>
            <Image
              src="/images/l-isola-delle-storie-favicon-light.svg"
              alt={title}
              priority={true}
              width="150px"
              height="150px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestImage;
