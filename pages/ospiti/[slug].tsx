import { GetStaticPaths, GetStaticProps } from "next";
import { getGuests, getGuestBySlug } from "../../lib/wp/guests";
import styles from "../../styles/pageDefault.module.scss";

const Ospite = ({ guest }: { guest: any }) => {
  console.log({ guest });
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeader}>
          <h1>Ospite</h1>
        </div>
      </div>

      <section className={styles.sectionContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.pageContentContainer}>
            <div>
              <h2>{guest.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: guest.dettagliOspite.descrizioneIt,
                }}
              ></div>
            </div>
            <div>Immage</div>
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
