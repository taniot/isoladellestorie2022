import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import { getGuests, getGuestsFake } from "../lib/wp/guests";
import { getPlacesFake } from "../lib/wp/places";
import { getPageByURI, getPages } from "../lib/wp/pages";
import Guests from "../components/guests/guests";
import Places from "../components/places/places";
import styles from "../styles/pageDefault.module.scss";
import Header from "../components/header/header";

const PageDefault = ({
  page,
  guests,
  places,
}: {
  page: any;
  guests: any;
  places: any;
}) => {
  if (!page) return <div>No page</div>;
  //console.log({ guests });
  return (
    <>
      <div className={styles.pageContainer}>
        <section className={styles.main}>
          <div className={styles.pageHeaderContainer}>
            <div className={styles.pageHeader}>
              <h1>{page.title}</h1>
            </div>
          </div>
        </section>
        <section className={styles.sectionContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.pageContentContainer}>
              <div
                className={styles.pageContent}
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </div>
          {guests && <Guests data={guests} />}
          {places && <Places data={places} />}
        </section>
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

export const getStaticProps = async (context: any) => {
  if (!context) return { props: {} };
  const pageURI = createURI(context);
  //const page = await getPageByURI(pageURI);
  const page = null;
  let guests = null;
  let places = null;

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
      //guests = await getGuestsFake(100);
      break;

    case "accoglienza":
      //places = await getPlacesFake(100);
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
    },
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
