import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import styles from "./back.module.scss";

const Back = ({ link, text }: { link: string; text: string }) => (
  <>
    <Link href={link} scroll={false}>
      <a className={styles.back}>
        <span>
          <CgArrowLeft />
        </span>
        <span className={styles.textBack}>{text}</span>
      </a>
    </Link>
  </>
);

export default Back;
