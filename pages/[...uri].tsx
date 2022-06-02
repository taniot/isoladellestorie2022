import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import { getGuests } from "../lib/wp/guests";
import { getPageByURI, getPages } from "../lib/wp/pages";
import Guests from "../components/guests/guests";
import Places from "../components/places/places";
import Partner from "../components/partner/partner";
import styles from "../styles/pageDefault.module.scss";
import { getSponsors } from "../lib/wp/sponsor";
import Eventi from "../components/eventi/eventi";
import { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import SelectDay from "../components/selectDay/selectDay";
import PageHeader from "../components/pageHeader/pageHeader";

const PageDefault = ({
  page,
  guests,
  places,
  partner,
  events,
}: {
  page: any;
  guests: any;
  places: any;
  partner: any;
  events: any;
}) => {
  const context = useContext(AppContext);
  const { state } = context;

  if (!page) return <div>No page</div>;

  return (
    <>
      <div className={styles.pageContainer}>
        <PageHeader page={page} />
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
        {events && <Eventi data={page.eventi} />}
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
  console.log({ page });
  let guests = null;
  let places = null;
  let partner = null;
  let events = null;

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
      //places = await getPlacesFake(100);
      places = null;
      break;

    case "partner":
      partner = await getSponsors();
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
