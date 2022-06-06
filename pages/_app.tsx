import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import languageObject from "../languagesObject";
import { getGuests } from "../lib/wp/guests";
import { getEvents } from "../lib/wp/events";
import TagManager from "react-gtm-module";
import { getTranslations } from "../lib/wp/translations";

const GOOGLE_TAG_MANAGER_ID: string = process.env.NEXT_PUBLIC_GTM_ID!;

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof languageObject>("en");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false);
  const [guests, setGuests] = useState<any[]>([]);
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

  useEffect(() => {
    const populateGuests = async () => {
      return await getGuests();
    };

    populateGuests()
      .then((data) => setGuests(data))
      .catch((error) => console.log(error));

    const populateEvents = async () => {
      return await getEvents();
    };

    populateEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));

    const populateTranslations = async () => {
      return await getTranslations();
    };

    populateTranslations()
      .then((data) => setTranslations(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state: {
          contents: languageObject[currentLanguage],
          language: currentLanguage,
          isMainMenuOpen,
          guests,
          events,
          translations,
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
