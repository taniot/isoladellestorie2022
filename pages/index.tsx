import type { GetStaticProps } from "next";
import Anteprima from "../components/anteprima/anteprima";
import Intro from "../components/intro/intro";
import News from "../components/news/news";
import { getPosts } from "../lib/wp/news";
import HomePartner from "../components/home/partner";
import { getSponsors } from "../lib/wp/sponsor";
import HomeSection from "../components/home/section";
import { useContext } from "react";
import AppContext from "../store/AppContext";
import { getTranslation } from "../lib/wp/translations";

const Home = ({ news, sponsors }: { news: {}; sponsors: {} }) => {
  const context = useContext(AppContext);
  const { state } = context;

  const ospitiSection = {
    title: getTranslation(
      state?.translations,
      "bottone_ospiti_home",
      state?.language
    ),
    url: "/ospiti/",
    target: "",
  };

  const newsSection = {
    title: getTranslation(
      state?.translations,
      "bottone_news_home",
      state?.language
    ),
    url: "/news/",
    target: "",
  };

  const sponsorSection = {
    title: getTranslation(
      state?.translations,
      "bottone_sponsor_home",
      state?.language
    ),
    url: "/sponsor/",
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
        <Anteprima />
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

export const getStaticProps: GetStaticProps = async (context) => {
  let guests = null;
  let news = await getPosts(1, "IT");
  let sponsors = await getSponsors("sostenuto-da");

  if (Array.isArray(news)) {
    news = news[0];
  }

  return {
    props: {
      guests,
      news,
      sponsors,
    },
  };
};

export default Home;
