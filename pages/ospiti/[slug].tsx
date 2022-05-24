import { GetStaticPaths, GetStaticProps } from "next";
import { getGuests, getGuestBySlug } from "../../lib/wp/guests";
import styles from "../../styles/pageDefault.module.scss";
import parse from "html-react-parser";
import GuestImage from "../../components/guests/image";

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
                <h1>
                  <span className={styles.nome}>{guest.nome}</span>{" "}
                  <span className={styles.cognome}>{guest.cognome}</span>
                </h1>
              ) : (
                <h1>{guest.title}</h1>
              )}
            </div>
            <div className={styles.guestBody}>
              <div className={styles.image}>
                <GuestImage title={guest.title} image={guest.image} />
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
