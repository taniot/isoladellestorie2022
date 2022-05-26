import styles from "./image.module.scss";
import Image from "next/image";

const GuestImage = ({ title, image }: { title: string; image?: string }) => {
  return (
    <div className={styles.borderContainer}>
      <div className={styles.image_container}>
        {image ? (
          <Image
            src={image}
            alt={title}
            priority={true}
            width="280px"
            height="280px"
            objectFit="cover"
            objectPosition="center"
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
