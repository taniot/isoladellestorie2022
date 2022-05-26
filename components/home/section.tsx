import Link from "next/link";
import { Component, FC } from "react";
import styles from "./section.module.scss";

interface Section {
  title: string;
  bgColor?: string;
  linkTo: {
    title: string;
    url: string;
  };
  children: React.ReactNode;
}

const HomeSection: FC<Section> = (props) => {
  const { title, bgColor = "white", linkTo, children } = props;
  return (
    <div className={styles.section} style={{ backgroundColor: bgColor }}>
      <h2 className={styles.title}>{title}</h2>
      {children}
      <Link href={linkTo.url} title={linkTo.title}>
        <a className={styles.button}>{linkTo.title}</a>
      </Link>
    </div>
  );
};

export default HomeSection;
