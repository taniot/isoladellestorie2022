import styles from "../../styles/pageDefault.module.scss";
import stylesPartner from "./partner.module.scss";
import HomePartner from "../home/partner";
import HomeSection from "../home/section";

const Partner = ({ data }: { data: any }) => {
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <HomeSection title="Sostenuto da" showButton={false} paddingY={50}>
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === "sostenuto-da"
              )}
            />
          </HomeSection>
          <HomeSection title="Collaborazioni" showButton={false} paddingY={50}>
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === "collaborazioni"
              )}
            />
          </HomeSection>
          <HomeSection
            title="Con il Patrocino di"
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
            title="In collaborazione con"
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
          <HomeSection title="Sponsor Tecnici" showButton={false} paddingY={50}>
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === "sponsor-tecnici"
              )}
            />
          </HomeSection>
          <HomeSection
            title="Media Technical Partner"
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
