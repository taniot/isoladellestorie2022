import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Guest from "../../components/guest/guest";
import { getGuestBySlug, getGuests } from "../../lib/wp/guests";

const Ospite = ({ guest }: { guest: any }) => {
  return (
    <>
      <Head>
        <title>{`${guest.title} - L'Isola delle Storie - 1-2-3 Luglio 2022 - Gavoi`}</title>
      </Head>
      <Guest guest={guest} />
    </>
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
    revalidate: 60,
  };
};

export default Ospite;
