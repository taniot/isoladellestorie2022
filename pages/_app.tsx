import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import Layout from "../components/layout/layout";
import AppContext from "../store/AppContext";
import { Languages } from "../store/types";
import "../styles/globals.scss";

const GOOGLE_TAG_MANAGER_ID: string = process.env.NEXT_PUBLIC_GTM_ID!;

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof Languages>("it");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [translations, setTranslations] = useState<any[]>([]);

  useEffect(() => {
    TagManager.initialize({ gtmId: GOOGLE_TAG_MANAGER_ID });
  }, []);

  useEffect(() => {
    if ((router.isReady && router.locale === "en") || router.locale === "it") {
      setCurrentLanguage(router.locale);
    }
  }, [router]);

  useEffect(() => {
    document.body.className = isMainMenuOpen ? "menu-open" : "menu-closed";
  }, [isMainMenuOpen]);

  return (
    <AppContext.Provider
      value={{
        state: {
          language: currentLanguage,
          isMainMenuOpen,
          events,
          translations,
        },
        setIsMainMenuOpen,
        setCurrentLanguage,
        setEvents,
        setTranslations,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
