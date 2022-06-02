import { GetStaticPaths, GetStaticProps } from "next";
import { getGuests, getGuestBySlug } from "../../lib/wp/guests";
import styles from "../../styles/pageDefault.module.scss";

import Guest from "../../components/guest/guest";

const Ospite = ({ guest }: { guest: any }) => {
  return <Guest guest={guest} />;
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
