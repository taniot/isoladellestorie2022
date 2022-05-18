import type { NextPage } from "next";
import Image from "next/image";
import Intro from "../components/intro/intro";
import styles from "../styles/home.module.scss";
const Home: NextPage = () => {
  return (
    <>
      <Intro />
    </>
  );
};

export default Home;
