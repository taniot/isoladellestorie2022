import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import languageObject from "../languagesObject";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const startIndex = 2;

  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof languageObject>("en");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false);

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
          contents: languageObject[currentLanguage],
          language: currentLanguage,
          isMainMenuOpen,
        },
        setIsMainMenuOpen,
        setCurrentLanguage,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
