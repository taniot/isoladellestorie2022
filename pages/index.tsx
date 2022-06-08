import type { GetStaticProps } from "next";
import { useContext, useEffect } from "react";
import Anteprima from "../components/anteprima/anteprima";
import HomePartner from "../components/home/partner";
import HomeSection from "../components/home/section";
import Intro from "../components/intro/intro";
import News from "../components/news/news";
import { getGuests } from "../lib/wp/guests";
import { getPosts } from "../lib/wp/news";
import { getSponsors } from "../lib/wp/sponsor";
import { getTranslation, getTranslations } from "../lib/wp/translations";
import AppContext from "../store/AppContext";
import { Guest, Translation } from "../store/types";

const Home = ({
  guests,
  news,
  sponsors,
  translations,
}: {
  guests: Guest[];
  news: {};
  sponsors: {};
  translations: Translation[];
}) => {
  const context = useContext(AppContext);
  const { state, setTranslations } = context;
  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [translations, setTranslations]);

  const ospitiSection = {
    title: getTranslation(
      state?.translations,
      "bottone_ospiti_home",
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      "bottone_ospiti_home",
      state?.language,
      "link"
    ),
    target: "",
  };

  const newsSection = {
    title: getTranslation(
      state?.translations,
      "bottone_news_home",
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      "bottone_news_home",
      state?.language,
      "link"
    ),
    target: "",
  };

  const sponsorSection = {
    title: getTranslation(
      state?.translations,
      "bottone_sponsor_home",
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      "bottone_sponsor_home",
      state?.language,
      "link"
    ),
    target: "",
  };

  return (
    <>
      <Intro />

      <HomeSection
        title={getTranslation(
          state?.translations,
          "titolo_ospiti_home",
          state?.language
        )}
        linkTo={ospitiSection}
      >
        <Anteprima data={guests} />
      </HomeSection>
      <HomeSection
        bgColor="#f1e596"
        title={getTranslation(
          state?.translations,
          "titolo_news_home",
          state?.language
        )}
        linkTo={newsSection}
      >
        <News data={news} />
      </HomeSection>
      <HomeSection
        title={getTranslation(
          state?.translations,
          "titolo_sponsor_home",
          state?.language
        )}
        linkTo={sponsorSection}
      >
        <HomePartner data={sponsors} />
      </HomeSection>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let guests = await getGuests();
  let news = await getPosts(1, "IT");
  let sponsors = await getSponsors("sostenuto-da");
  let translations = await getTranslations();

  if (Array.isArray(news)) {
    news = news[0];
  }

  return {
    props: {
      guests,
      news,
      sponsors,
      translations,
    },
    revalidate: 10800,
  };
};

export default Home;
