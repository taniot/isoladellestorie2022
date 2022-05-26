import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import languageObject from "../languagesObject";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof languageObject>("en");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ((router.isReady && router.locale === "en") || router.locale === "it") {
      setCurrentLanguage(router.locale);
    }

    const handleComplete = () => {
      setIsLoading(false);
      //console.log("sono esecuto");
    };

    const handleGae = () => {
      //setIsLoading(true);
      //console.log("comincia");
    };

    //console.log({ isLoading });

    router.events.on("routeChangeStart", handleGae);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, isLoading]);

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
        {isLoading ? <div>Loading</div> : <Component {...pageProps} />}
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
