import { GetStaticPaths, GetStaticProps } from "next";
import { getGuests, getGuestBySlug } from "../../lib/wp/guests";
import styles from "../../styles/pageDefault.module.scss";
import parse from "html-react-parser";
import GuestImage from "../../components/guests/image";
import cls from "classnames";

const Ospite = ({ guest }: { guest: any }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeader}>
          <h1>Ospiti</h1>
        </div>
      </div>

      <section className={styles.sectionContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.guestContentContainer}>
            <div className={styles.guestHeader}>
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
            </div>
            <div className={styles.guestBody}>
              <div className={styles.image}>
                <GuestImage title={guest.title} image={guest.image} />
                <div className={styles.giorniFestival}>
                  <div className={styles.plus}>+</div>
                  <h4>I giorni del festival</h4>
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
                </div>
              </div>
              <div className={styles.text}>
                {parse(guest.descrizioneIt ? guest.descrizioneIt : "")}
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
