import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useContext } from 'react'
import { GoHeart } from 'react-icons/go'
import { GrFacebookOption, GrInstagram, GrTwitter } from 'react-icons/gr'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import styles from './footer.module.scss'

const Footer = () => {
  const context = useContext(AppContext)
  const { state } = context
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
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
              src="/images/l-isola-delle-storie.svg"
              layout="fill"
              alt="L’Isola delle Storie 2022"
              className={styles.logo}
              priority
            />
          )}
        </div>

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
            </a>{' '}
            -{' '}
            <a
              href="https://www.iubenda.com/privacy-policy/96389350/cookie-policy"
              className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe "
              title="Cookie Policy"
            >
              Cookie Policy
            </a>{' '}
            -{' '}
            <Link href="/info-visitatori/contatti/">
              <a>
                {getTranslation(
                  state?.translations,
                  'menu_contatti',
                  state?.language
                )}
              </a>
            </Link>
          </p>
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
        <div className={styles.taniotContainer}>
          <div className={styles.poweredBy}>
            <a
              href="https://taniot.net/?ref=isoladellestorie"
              target="_blank"
              rel="noopener noreferrer"
              className="items-center text-logo text-sm"
            >
              - handmade with <GoHeart className={styles.loveIcon} /> by taniot
              -
            </a>
          </div>
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
  )
}

export default Footer
