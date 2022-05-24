import type { NextPage } from "next";
import About from "../components/about/about";
import Anteprima from "../components/anteprima/anteprima";
import Intro from "../components/intro/intro";
const Home: NextPage = () => {
  return (
    <>
      <Intro />
      <Anteprima />
    </>
  );
};

export default Home;
