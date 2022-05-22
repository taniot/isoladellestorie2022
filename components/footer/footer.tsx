import styles from "./footer.module.scss";
import Image from "next/image";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.infoContainer}>
          <h2>©XVII L’Isola delle Storie</h2>
          <p>C.F. e P.IVA 93024780913</p>
          <p>Via Garibaldi 2, Gavoi (NU)</p>
          <p>info@isoladellestorie.it</p>
          <p className={styles.legalData}>
            Informativa Privacy – Cookie Policy
          </p>
        </div>
        <div className={styles.logoArea}>
          <div className={styles.logoContainer}>
            {isMobile ? (
              <Image
                src="/images/l-isola-delle-storie.svg"
                layout="fill"
                alt="L’Isola delle Storie 2022"
                className={styles.logo}
                priority
              />
            ) : (
              <Image
                src="/images/l-isola-delle-storie-logo.svg"
                layout="fill"
                alt="L’Isola delle Storie 2022"
                className={styles.logo}
                priority
              />
            )}
          </div>
          <div className={styles.socialContainer}>
            <a className={styles.socialIcon}>
              <GrFacebookOption className={styles.icon} />
            </a>
            <a className={styles.socialIcon}>
              <GrInstagram className={styles.icon} />
            </a>

            <a className={styles.socialIcon}>
              <GrTwitter className={styles.icon} />
            </a>
          </div>
        </div>
        <div className={styles.devContainer}>
          <p>Per le foto si ringrazia: Francesca Marchi</p>
          <p>Illustrazione: Toni Demuro</p>
          <p>Progetto Grafico: Sabina Era</p>
          <p className={styles.poweredBy}>Powered by taniot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
