import styles from "./partner.module.scss";
import cls from "classnames";
import Link from "next/link";
import Image from "next/image";

const HomePartner = ({ data }) => {
  if (!data) return null;
  return (
    <section className={styles.anteprima}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sostenuto da</h2>
        <div className={styles.sponsor_list}>
          {data.map((sponsor) => (
            <a
              key={sponsor.title}
              href={sponsor.link}
              title={sponsor.title}
              target="_blank"
              rel="noreferrer"
              className={styles.sponsor}
            >
              {sponsor.image ? (
                <Image src={sponsor.image} layout="fill" alt={sponsor.title} />
              ) : (
                sponsor.title
              )}
            </a>
          ))}
        </div>
        <Link href="/sponsor/">
          <a className={styles.button}>Tutti gli sponsor</a>
        </Link>
      </div>
    </section>
  );
};

export default HomePartner;
