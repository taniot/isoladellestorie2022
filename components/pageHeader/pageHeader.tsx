import styles from "./pageHeader.module.scss";
import SelectDay from "../selectDay/selectDay";

const PageHeader = ({ page }: { page: any }) => (
  <div className={styles.pageHeaderContainer}>
    <div className={styles.pageHeader}>
      <h1>{page?.parent?.title || page?.title || `Titolo`}</h1>
      <h2>{page?.parent?.title ? page?.title : null}</h2>
      {page.template === "eventi" && <SelectDay page={page} />}
    </div>
  </div>
);

export default PageHeader;
