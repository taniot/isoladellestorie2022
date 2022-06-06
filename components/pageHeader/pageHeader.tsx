import styles from "./pageHeader.module.scss";
import SelectDay from "../selectDay/selectDay";
import Head from "next/head";

const PageHeader = ({ page }: { page: any }) => (
  <>
    <Head>
      <title>
        {page?.parent?.title
          ? `${page?.parent?.title} - ${page?.title}`
          : page?.title}{" "}
        - L`Isola delle Storie - 1-2-3 Luglio 2022 - Gavoi
      </title>
    </Head>

    <div className={styles.pageHeaderContainer}>
      <div className={styles.pageHeader}>
        <h1>{page?.parent?.title || page?.title || `Titolo`}</h1>
        <h2>
          {(page?.parent?.title && page?.title) || page?.subtitleIt || null}
        </h2>
        {page.template === "eventi" && <SelectDay page={page} />}
      </div>
    </div>
  </>
);

export default PageHeader;
