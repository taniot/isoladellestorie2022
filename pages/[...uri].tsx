import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import { getGuests } from "../lib/wp/guests";
import { getPlacesFake } from "../lib/wp/places";
import { getPageByURI, getPages } from "../lib/wp/pages";
import Guests from "../components/guests/guests";
import Places from "../components/places/places";
import Partner from "../components/partner/partner";
import styles from "../styles/pageDefault.module.scss";

import AppContext from "../store/AppContext";

import { useRouter } from "next/router";
import { getSponsors } from "../lib/wp/sponsor";

const PageDefault = ({
  page,
  guests,
  places,
  partner,
}: {
  page: any;
  guests: any;
  places: any;
  partner: any;
}) => {
  if (!page) return <div>No page</div>;

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeaderContainer}>
          <div className={styles.pageHeader}>
            <h1>{page.title}</h1>
          </div>
        </div>

        <section className={styles.sectionContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.pageContentContainer}>
              <div
                className={styles.pageContent}
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </div>
        </section>
        {guests && <Guests data={guests} />}
        {places && <Places data={places} />}
        {partner && <Partner data={partner} />}
      </div>
    </>
  );
};

export default PageDefault;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();

  const paths = pages.map((page: any) => {
    return {
      params: {
        uri: page.uri.split("/").filter((element: any) => {
          return element !== "";
        }),
      },
      locale: page.language.slug,
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  if (!context) return { props: {} };
  const pageURI = createURI(context);
  const page = await getPageByURI(pageURI);
  let guests = null;
  let places = null;
  let partner = null;

  if (!page)
    return {
      notFound: true,
    };

  console.log({ page });

  switch (page.dettagliPagina.template) {
    case "nopage":
      return {
        notFound: true,
      };

    case "ospiti":
      guests = await getGuests();
      break;

    case "accoglienza":
      places = await getPlacesFake(100);
      break;

    case "partner":
      partner = await getSponsors();
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
