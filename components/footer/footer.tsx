import styles from "./footer.module.scss";
import Image from "next/image";
import { GrFacebookOption, GrInstagram, GrTwitter } from "react-icons/gr";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import Script from "next/script";
const Iubenda = require("react-iubenda-policy");

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
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
            <a
              href="https://www.iubenda.com/privacy-policy/96389350"
              className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iub-legal-only iubenda-noiframe "
              title="Privacy Policy"
            >
              Privacy Policy
            </a>{" "}
            –{" "}
            <a
              href="https://www.iubenda.com/privacy-policy/96389350/cookie-policy"
              className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe "
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
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
            <a
              href="https://www.facebook.com/isoladellestorie/"
              className={styles.socialIcon}
              target="_blank"
              rel="noreferrer"
            >
              <GrFacebookOption className={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com/gavoifestival/"
              className={styles.socialIcon}
              target="_blank"
              rel="noreferrer"
            >
              <GrInstagram className={styles.icon} />
            </a>

            <a
              href="https://twitter.com/gavoifestival"
              className={styles.socialIcon}
              target="_blank"
              rel="noreferrer"
            >
              <GrTwitter className={styles.icon} />
            </a>
          </div>
        </div>
        <div className={styles.devContainer}>
          <p>
            Illustrazione: <strong>Toni Demuro</strong>
          </p>
          <p>
            Progetto Grafico: <strong>Sabina Era</strong>
          </p>

          <p className={styles.poweredBy}>
            powered by <strong>taniot</strong>
          </p>
        </div>
      </div>
      <Script
        id="privacy-policy"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
  `,
        }}
      />
      <Script
        id="cookie-policy"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
  `,
        }}
      />
    </footer>
  );
};

export default Footer;
