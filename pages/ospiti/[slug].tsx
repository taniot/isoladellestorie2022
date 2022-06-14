import { GetStaticPaths, GetStaticProps } from "next";

import Guest from "../../components/guest/guest";
import { getGuestBySlug, getGuests } from "../../lib/wp/guests";
import { getTranslations } from "../../lib/wp/translations";
import { useContext, useEffect } from "react";
import AppContext from "../../store/AppContext";
import { TranslationType, GuestType } from "../../store/types";
import Seo from "../../components/seo/seo";

const Ospite = ({
  guest,
  translations,
}: {
  guest: GuestType;
  translations: TranslationType[];
}) => {
  const context = useContext(AppContext);
  const { setTranslations } = context;

  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [setTranslations, translations]);
  return (
    <>
      <Seo title={guest.title} />
      <Guest guest={guest} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const guests = await getGuests();

  const paths = guests?.map((guest: any) => {
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
    revalidate: 10800,
  };
};

export default Ospite;
