import type { GetStaticProps, NextPage } from "next";
import Anteprima from "../components/anteprima/anteprima";
import Intro from "../components/intro/intro";
import News from "../components/news/news";
import { getPosts } from "../lib/wp/news";
import HomePartner from "../components/home/partner";
import { getSponsors } from "../lib/wp/sponsor";
import HomeSection from "../components/home/section";
import { isArray } from "util";
const Home = ({ news, sponsors }: { news: {}; sponsors: {} }) => {
  const ospitiSection = {
    title: "Scopri tutti gli ospiti",
    url: "/ospiti/",
    target: "",
  };

  const newsSection = {
    title: "Leggi tutte le news",
    url: "/news/",
    target: "",
  };

  const sponsorSection = {
    title: "Tutti gli sponsor",
    url: "/sponsor/",
    target: "",
  };

  return (
    <>
      <Intro />

      <HomeSection title="A L’Isola delle Storie XVII" linkTo={ospitiSection}>
        <Anteprima />
      </HomeSection>
      <HomeSection
        bgColor="#f1e596"
        title="Succede a L’Isola XVII"
        linkTo={newsSection}
      >
        <News data={news} />
      </HomeSection>
      <HomeSection title="Sostenuto da" linkTo={sponsorSection}>
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
