import styles from "../../styles/pageDefault.module.scss";
import stylesPartner from "./partner.module.scss";
import HomePartner from "../home/partner";

const Partner = ({ data }: { data: any }) => {
  console.log({ data });
  const sponsor = [
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
    {
      title: "prova",
      url: "https://taniot.net",
      image: "",
    },
  ];

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <HomePartner
            data={data.filter(
              (partner: { type: string }) => partner.type === "sostenuto-da"
            )}
            showButton={false}
          />
          <HomePartner
            data={data.filter(
              (partner: { type: string }) => partner.type === "collaborazioni"
            )}
            showButton={false}
            title="Collaborazioni"
          />
          <HomePartner
            data={data.filter(
              (partner: { type: string }) => partner.type === "patrocinio"
            )}
            showButton={false}
            title="Con il Patrocino di"
          />
          <HomePartner
            data={data.filter(
              (partner: { type: string }) =>
                partner.type === "in-collaborazione-con"
            )}
            showButton={false}
            title="In collaborazione con"
          />
          <HomePartner
            data={data.filter(
              (partner: { type: string }) => partner.type === "sponsor-tecnici"
            )}
            showButton={false}
            title="Sponsor Tecnici"
          />
          <HomePartner
            data={data.filter(
              (partner: { type: string }) =>
                partner.type === "media-technical-partner"
            )}
            showButton={false}
            title="Media Technical Partner"
          />
        </div>
      </div>
    </>
  );
};

export default Partner;
