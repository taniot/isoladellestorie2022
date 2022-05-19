import type { NextPage } from "next";
import Anteprima from "../components/anteprima/anteprima";
import Cover from "../components/cover/cover";
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
