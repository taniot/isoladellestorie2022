import type { GetStaticProps, NextPage } from "next";
import Anteprima from "../components/anteprima/anteprima";
import Intro from "../components/intro/intro";
import News from "../components/news/news";
import { getPosts } from "../lib/wp/news";
import HomePartner from "../components/home/partner";
import { getSponsors } from "../lib/wp/sponsor";
import HomeSection from "../components/home/section";
const Home = ({
  guests,
  news,
  sponsors,
}: {
  guests: {};
  news: {};
  sponsors: {};
}) => {
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

      <HomeSection title="All’Isola delle Storie XVII" linkTo={ospitiSection}>
        <Anteprima />
      </HomeSection>
      <HomeSection
        bgColor="#f1e596"
        title="Succede all’Isola XVII"
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
  let news = await getPosts("IT", 1);
  let sponsors = await getSponsors("sostenuto-da");

  return {
    props: {
      guests,
      news,
      sponsors,
    },
  };
};

export default Home;
