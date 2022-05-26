import Link from "next/link";
import { Component, FC } from "react";
import styles from "./section.module.scss";

interface Section {
  title: string;
  bgColor?: string;
  linkTo?: {
    title: string;
    url: string;
  };
  showButton?: boolean;
  children: React.ReactNode;
  paddingY?: number;
}

const HomeSection: FC<Section> = (props) => {
  const {
    title,
    bgColor = "white",
    linkTo,
    children,
    showButton = true,
    paddingY = 100,
  } = props;
  return (
    <div
      className={styles.section}
      style={{
        backgroundColor: bgColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      {children}
      {showButton && linkTo && (
        <Link href={linkTo?.url} title={linkTo?.title}>
          <a className={styles.button}>{linkTo?.title}</a>
        </Link>
      )}
    </div>
  );
};

export default HomeSection;
