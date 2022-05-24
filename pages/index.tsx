import type { GetStaticProps, NextPage } from "next";
import Anteprima from "../components/anteprima/anteprima";
import Intro from "../components/intro/intro";
import News from "../components/news/news";
import { getPosts } from "../lib/wp/news";
import HomePartner from "../components/home/partner";
import { getSponsors } from "../lib/wp/sponsor";
const Home: NextPage = (props) => {
  const { guests, news, sponsors } = props;

  return (
    <>
      <Intro />
      <Anteprima />
      <News data={news} />
      <HomePartner data={sponsors} />
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
