import styles from "./partner.module.scss";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

const HomePartner = ({
  data,
  title = "Sostenuto da",
  showButton = true,
}: {
  data: any;
  title?: string;
  showButton?: boolean;
}) => {
  if (!data) return null;
  return (
    <section className={styles.anteprima}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.sponsor_list}>
          {data.map((sponsor: any) => (
            <>
              {sponsor.image ? (
                <a
                  key={sponsor.title}
                  href={sponsor.link}
                  title={sponsor.title}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.sponsor}
                >
                  <Image
                    src={sponsor.image}
                    layout="fill"
                    alt={sponsor.title}
                    width="200"
                    height="195px"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </a>
              ) : (
                <a
                  key={sponsor.title}
                  href={sponsor.link}
                  title={sponsor.title}
                  target="_blank"
                  rel="noreferrer"
                  className={cls(styles.sponsor, styles.noImage)}
                >
                  <span>{sponsor.title}</span>
                </a>
              )}
            </>
          ))}
        </div>
        {showButton && (
          <Link href="/sponsor/">
            <a className={styles.button}>Tutti gli sponsor</a>
          </Link>
        )}
      </div>
    </section>
  );
};

export default HomePartner;
