import styles from "./pageHeader.module.scss";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";
const PageHeader = ({ page }: { page: any }) => (
  <div className={styles.pageHeaderContainer}>
    <div className={styles.pageHeader}>
      <h1>{page?.parentTitle || page?.title || `Titolo`}</h1>
      <div className="flex items-center">
        <h2>{page?.parentTitle ? page?.title : null} </h2>
      </div>
    </div>
  </div>
);

export default PageHeader;
