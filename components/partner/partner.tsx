import styles from "../../styles/pageDefault.module.scss";
import HomePartner from "../home/partner";
import HomeSection from "../home/section";
import { getTranslation } from "../../lib/wp/translations";
import AppContext from "../../store/AppContext";
import { useContext } from "react";
const Partner = (info: any) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, page } = info;
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_sostenuto_da",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === "sostenuto-da"
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_collaborazione_contributo",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === "collaborazioni"
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_patrocinio",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === "patrocinio"
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_collaborazione",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === "in-collaborazione-con"
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_tecnici",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === "sponsor-tecnici"
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              "sponsor_media",
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === "media-technical-partner"
              )}
            />
          </HomeSection>
        </div>
      </div>
    </>
  );
};

export default Partner;
