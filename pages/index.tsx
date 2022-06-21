import type { GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";
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
import {
  GuestType,
  PartnerType,
  TranslationType,
  wpNews,
} from "../store/types";
import { useRouter } from "next/router";
import currentLocale from "../utils/currentLocale";

const Home = ({
  guests,
  news,
  sponsors,
  translations,
}: {
  guests: GuestType[];
  news: wpNews;
  sponsors: PartnerType[];
  translations: TranslationType[];
}) => {
  const context = useContext(AppContext);
  const router = useRouter();
  const { state, setTranslations } = context;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [translations, setTranslations]);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

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

  const streamingSection = {
    title: getTranslation(
      state?.translations,
      "bottone_streaming_home",
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      "bottone_streaming_home",
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
      {!isLoading && (
        <>
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

          {news && (
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
          )}

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
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let guests = await getGuests();
  let news = await getPosts(1, currentLocale(context.locale));
  let sponsors = await getSponsors("sostenuto-da");
  let translations = await getTranslations();
  let latestNews = null;
  if (Array.isArray(news) && news.length > 0) {
    latestNews = news[0];
  }

  return {
    props: {
      guests,
      news: latestNews,
      sponsors,
      translations,
    },
    //revalidate: 10800,
  };
};

export default Home;
