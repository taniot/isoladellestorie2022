import { GetStaticPaths, GetStaticProps } from "next";
import { getGuests, getGuestBySlug } from "../../lib/wp/guests";
import styles from "../../styles/pageDefault.module.scss";
import parse from "html-react-parser";
import GuestImage from "../../components/guests/image";
import cls from "classnames";
import { CgArrowLongLeft } from "react-icons/cg";
import Link from "next/link";

const Ospite = ({ guest }: { guest: any }) => {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.sectionContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.guestContentContainer}>
            <div className={styles.guestHeader}>
              <div className={styles.image}>
                <GuestImage
                  title={guest.title}
                  image={guest.image}
                  width={280}
                  height={280}
                />
              </div>

              {guest.nome && guest.cognome ? (
                <>
                  <h2>
                    <span className={styles.nome}>{guest.nome}</span>{" "}
                    <span className={styles.cognome}>{guest.cognome}</span>
                  </h2>
                  <h3>{guest.jobTitleIt}</h3>
                </>
              ) : (
                <>
                  <h2>{guest.title}</h2>
                  <h3>{guest.jobTitleIt}</h3>
                </>
              )}
              <div className={styles.giorniFestival}>
                <ul>
                  <li>
                    <span className={cls(styles.dayNumber, styles.active)}>
                      01
                    </span>
                  </li>
                  <li>
                    <span className={styles.dayNumber}>02</span>
                  </li>
                  <li>
                    <span className={styles.dayNumber}>03</span>
                  </li>
                </ul>
                <h4>I giorni del festival</h4>
              </div>
            </div>
            <div className={styles.guestBody}>
              <div className={styles.text}>
                {parse(guest.descrizioneIt ? guest.descrizioneIt : "")}

                <Link href="/ospiti/" scroll={false}>
                  <a className={styles.back}>
                    <span>
                      <CgArrowLongLeft />
                    </span>
                    <span className={styles.textBack}>Torna agli Ospiti</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const guests = await getGuests();

  const paths = guests.map((guest: any) => {
    return {
      params: {
        slug: guest.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  let guest = null;

  if (typeof slug === "string") guest = await getGuestBySlug(slug);

  return {
    props: {
      guest,
    },
  };
};

export default Ospite;
