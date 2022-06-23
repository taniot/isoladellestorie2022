import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'

const Seo = ({ title }: { title?: string }) => {
  const { state } = useContext(AppContext)

  const defaultTitle = getTranslation(
    state?.translations,
    'titolo_sito',
    state?.language
  )
  const resultTitle = title ? `${title} - ${defaultTitle}` : defaultTitle
  const router = useRouter()

  let canonical = 'https://www.isoladellestorie.it'
  if (router.locale === 'it') {
    canonical += router.asPath
  } else {
    canonical += `/${router.locale}`
    canonical += router.asPath
  }

  return (
    <NextSeo
      title={resultTitle}
      description="L’Isola delle Storie è un’istituzione culturale che trasforma per tre giorni Gavoi in un unico spazio di scambio e di comunicazione senza confini."
      canonical={canonical}
      openGraph={{
        type: 'website',
        url: canonical,
        title: "L'Isola delle Storie - Festival Letterario della Sardegna",
        description:
          'L’Isola delle Storie è un’istituzione culturale che trasforma per tre giorni Gavoi in un unico spazio di scambio e di comunicazione senza confini.',
        images: [
          {
            url: 'https://www.isoladellestorie.it/images/copertina-lg.png',
            alt: 'L’Isola delle Storie - Festival Letterario della Sardegna',
            type: 'image/png',
          },
        ],
        site_name: 'L’Isola delle Storie',
      }}
      twitter={{
        site: '@gavoifestival',
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon-light.svg',
        },
      ]}
    />
  )
}

export default Seo
