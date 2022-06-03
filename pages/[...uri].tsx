import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import { getGuests } from "../lib/wp/guests";
import { getPageByURI, getPages } from "../lib/wp/pages";
import Guests from "../components/guests/guests";
import Places from "../components/places/places";
import Partner from "../components/partner/partner";
import styles from "../styles/pageDefault.module.scss";
import { getSponsors } from "../lib/wp/sponsor";
import Eventi from "../components/eventi/eventi";

import PageHeader from "../components/pageHeader/pageHeader";
import { getPlaces } from "../lib/wp/places";
import { getPosts } from "../lib/wp/news";
import NewsList from "../components/newsList/newsList";

const PageDefault = ({
  page,
  guests,
  places,
  partner,
  events,
  news,
}: {
  page: any;
  guests: any;
  places: any;
  partner: any;
  events: any;
  news: any;
}) => {
  return (
    <>
      <div className={styles.pageContainer}>
        <PageHeader page={page} />
        <section className={styles.sectionContainer}>
          {page.content && (
            <div className={styles.contentContainer}>
              <div className={styles.pageContentContainer}>
                <div
                  className={styles.pageContent}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            </div>
          )}
        </section>
        {guests && <Guests data={guests} />}
        {places && <Places data={places} />}
        {partner && <Partner data={partner} />}
        {events && <Eventi data={page.eventi} />}
        {news && <NewsList data={news} />}
      </div>
    </>
  );
};

export default PageDefault;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();

  const paths =
    pages?.map((page: any) => {
      return {
        params: {
          uri: page.uri.split("/").filter((element: any) => {
            return element !== "";
          }),
        },
        locale: page.language.slug,
      };
    }) || [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  if (!context) return { props: {} };
  const pageURI = createURI(context);
  const page = await getPageByURI(pageURI);
  //console.log({ page });
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
      news = await getPosts(10);
      break;

    case "eventi":
      events = true;
      break;

    default:
      //caso default;
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
    },
    revalidate: 60,
  };
};

const createURI = (context: {
  params: any;
  preview?: boolean | undefined;
  previewData?: PreviewData;
  locale: any;
  locales?: string[] | undefined;
  defaultLocale: any;
}) => {
  const {
    params: { uri },
    locale,
    defaultLocale,
  } = context;

  let uriParts = [];
  if (locale !== defaultLocale) uriParts.push(locale);
  uriParts = [...uriParts, ...uri];

  let pageURI = `/${uriParts.join("/")}/`;

  return pageURI;
};
