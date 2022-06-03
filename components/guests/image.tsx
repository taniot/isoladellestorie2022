import styles from "./image.module.scss";
import Image from "next/image";

const GuestImage = ({
  title,
  image,
  width = 200,
  height = 200,
  borderColor = "#fff",
}: {
  title: string;
  image?: string;
  width?: number;
  height?: number;
  borderColor?: string;
}) => {
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
