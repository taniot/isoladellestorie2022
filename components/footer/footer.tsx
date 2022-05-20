import styles from "./footer.module.scss";
import Image from "next/image";
import {
  GrFacebookOption,
  GrInstagram,
  GrYoutube,
  GrTwitter,
} from "react-icons/gr";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/l-isola-delle-storie-logo.svg"
          layout="fill"
          alt="Gae"
          className={styles.logo}
          priority
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.owner}>
          Associazione Culturale L’Isola delle Storie
        </div>
        <div className={styles.legalData}>
          <a>Cookie Policy</a> / <a>Privacy Policy</a> / <a>Note Legali</a> /{" "}
          <a>Credits</a>
        </div>
      </div>
      <div className={styles.socialContainer}>
        <a className={styles.socialIcon}>
          <GrFacebookOption className={styles.icon} />
        </a>
        <a className={styles.socialIcon}>
          <GrInstagram className={styles.icon} />
        </a>
        <a className={styles.socialIcon}>
          <GrYoutube className={styles.icon} />
        </a>
        <a className={styles.socialIcon}>
          <GrTwitter className={styles.icon} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
