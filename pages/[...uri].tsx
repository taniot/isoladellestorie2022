import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useContext, useEffect } from "react";
import Eventi from "../components/eventi/eventi";
import Guests from "../components/guests/guests";
import NewsList from "../components/newsList/newsList";
import PageHeader from "../components/pageHeader/pageHeader";
import Partner from "../components/partner/partner";
import Places from "../components/places/places";
import { getEvents } from "../lib/wp/events";
import { getGuests } from "../lib/wp/guests";
import { getPosts } from "../lib/wp/news";
import { getPageByURI, getPages } from "../lib/wp/pages";
import { getPlaces } from "../lib/wp/places";
import { getSponsors } from "../lib/wp/sponsor";
import { getTranslations } from "../lib/wp/translations";
import AppContext from "../store/AppContext";
import {
  EventType,
  GuestType,
  Page,
  PartnerType,
  PlaceType,
  TranslationType,
  wpNews,
  wpPage,
} from "../store/types";
import styles from "../styles/pageDefault.module.scss";
import { createURI } from "../utils/createUri";
import currentLocale from "../utils/currentLocale";

const PageDefault = ({
  page,
  guests,
  places,
  partner,
  events,
  news,
  defaultPage,
  translations,
}: {
  page: Page;
  guests: GuestType[];
  places: PlaceType[];
  partner: PartnerType[];
  events: EventType[];
  news: wpNews[];
  defaultPage: boolean;
  translations: TranslationType[];
}) => {
  const { setTranslations } = useContext(AppContext);

  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [setTranslations, translations]);

  return (
    <>
      <div className={styles.pageContainer}>
        <PageHeader page={page} />
        {defaultPage && (
          <section className={styles.sectionContainer}>
            <div className={styles.contentContainer}>
              <div className={styles.pageContentContainer}>
                <div
                  className={styles.pageContent}
                  dangerouslySetInnerHTML={{ __html: page?.content }}
                />
              </div>
            </div>
          </section>
        )}

        {guests && <Guests data={guests} />}
        {places && <Places data={places} page={page} />}
        {partner && <Partner data={partner} page={page} />}
        {events && <Eventi data={events} page={page} />}
        {page.template === "news" && <NewsList data={news} page={page} />}
      </div>
    </>
  );
};

export default PageDefault;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();

  const paths =
    pages?.map((page: wpPage) => {
      return {
        params: {
          uri: page.uri.split("/").filter((element: string) => {
            return element !== "";
          }),
        },
        locale: page.language.slug,
      };
    }) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  if (!context) return { props: {} };

  const pageURI = createURI(
    context?.params?.uri,
    context.locale,
    context.defaultLocale
  );
  const page = await getPageByURI(pageURI);
  const translations = await getTranslations();
  let defaultPage = false;
  let guests = null;
  let places = null;
  let partner = null;
  let events = null;
  let news = null;

  if (!page?.id)
    return {
      notFound: true,
    };

  switch (page.template) {
    case "nopage":
      return {
        notFound: true,
      };

    case "ospiti":
      guests = await getGuests();
      break;

    case "accoglienza":
      places = await getPlaces(page?.accoglienza?.tipologia);
      break;

    case "partner":
      partner = await getSponsors();
      break;

    case "news":
      news = await getPosts(10, currentLocale(context.locale));
      break;

    case "eventi":
      events = await getEvents();
      break;

    default:
      defaultPage = true;
      break;
  }

  return {
    props: {
      page,
      guests,
      places,
      partner,
      events,
      news,
      defaultPage,
      translations,
    },
    //revalidate: 10800,
  };
};
