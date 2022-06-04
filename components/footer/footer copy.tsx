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
          src="/images/l-isola-delle-storie.svg"
          layout="fill"
          alt="Gae"
          className={styles.logo}
          priority
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.owner}>
          <h2>Associazione Culturale L’Isola delle Storie</h2>
          <p>
            C.F. e P.IVA 02945590046 Piazza Medford 3, Alba (CN) Tel. +39 0173
            361051 – info@vinumalba.com
          </p>
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
