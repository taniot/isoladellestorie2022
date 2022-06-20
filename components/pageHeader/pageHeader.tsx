import styles from "./pageHeader.module.scss";
import SelectDay from "../selectDay/selectDay";
import Seo from "../seo/seo";
import { Page } from "../../store/types";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import { getTranslation } from "../../lib/wp/translations";

const PageHeader = ({ page }: { page?: Page }) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Seo
        title={
          page
            ? page?.parent?.title
              ? `${page?.parent?.title} - ${page?.title}`
              : `${page?.title}`
            : ""
        }
      />

      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeader}>
          <h1>{page?.parent?.title || page?.title || null}</h1>
          <h2>
            {(page?.parent?.title && page?.title) || page?.subtitleIt || null}
          </h2>
          {page?.template === "eventi" && <SelectDay page={page} />}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
