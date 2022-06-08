import { NextSeo } from "next-seo";

const Seo = ({ title }: { title?: string }) => {
  const defaultTitle = "L’Isola delle Storie - dal 1 al 3 luglio 2022 a Gavoi";
  const resultTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;

  return (
    <NextSeo
      title={resultTitle}
      description="L’Isola delle Storie è un’istituzione culturale che trasforma per tre giorni Gavoi in un unico spazio di scambio e di comunicazione senza confini."
      canonical="https://www.isoladellestorie.it"
      openGraph={{
        type: "website",
        url: "https://www.isoladellestorie.it",
        title: "L'Isola delle Storie - Festival Letterario della Sardegna",
        description:
          "L’Isola delle Storie è un’istituzione culturale che trasforma per tre giorni Gavoi in un unico spazio di scambio e di comunicazione senza confini.",
        images: [
          {
            url: "https://www.isoladellestorie.it/images/copertina-lg.png",
            alt: "L'Isola delle Storie - Festival Letterario della Sardegna",
            type: "image/png",
          },
        ],
        site_name: "L’Isola delle Storie",
      }}
      twitter={{
        site: "@gavoifestival",
        cardType: "summary_large_image",
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/favicon-light.svg",
        },
      ]}
    />
  );
};

export default Seo;