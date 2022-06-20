import { GetStaticProps } from "next";
import PageHeader from "../components/pageHeader/pageHeader";
import { getTranslations, getTranslation } from "../lib/wp/translations";
import styles from "../styles/pageDefault.module.scss";
import { TranslationType } from "../store/types";
import { useContext, useEffect } from "react";
import AppContext from "../store/AppContext";

const ErrorPage = ({ translations }: { translations: TranslationType[] }) => {
  const { setTranslations, state } = useContext(AppContext);

  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [setTranslations, translations]);

  const page = {
    title: getTranslation(state?.translations, "404_title", state?.language),
    subtitleIt: getTranslation(
      state?.translations,
      "404_subtitle",
      state?.language
    ),
    content: "",
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <PageHeader page={page} />
        <section className={styles.sectionContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.pageContentContainer}>
              <div
                className={styles.pageContent}
                dangerouslySetInnerHTML={{
                  __html: getTranslation(
                    state?.translations,
                    "404_content",
                    state?.language
                  ),
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ErrorPage;

export const getStaticProps: GetStaticProps = async (context) => {
  let translations = await getTranslations();

  return {
    props: {
      translations,
    },
  };
};
