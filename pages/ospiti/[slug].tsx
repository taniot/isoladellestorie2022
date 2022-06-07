import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Guest from "../../components/guest/guest";
import { getGuestBySlug, getGuests } from "../../lib/wp/guests";
import { getTranslations } from "../../lib/wp/translations";
import { useContext, useEffect } from "react";
import AppContext from "../../store/AppContext";
import { Guest as GuestType, Translation } from "../../store/types";

const Ospite = ({
  guest,
  translations,
}: {
  guest: GuestType;
  translations: Translation[];
}) => {
  const context = useContext(AppContext);
  const { setTranslations } = context;

  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [setTranslations, translations]);
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

  const paths = guests?.map((guest: GuestType) => {
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
  let translations = await getTranslations();
  if (typeof slug === "string") guest = await getGuestBySlug(slug);

  return {
    props: {
      guest,
      translations,
    },
    //revalidate: 3600,
  };
};

export default Ospite;
