import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Anteprima from '../components/anteprima/anteprima'
import HomePartner from '../components/home/partner'
import HomeSection from '../components/home/section'
import Intro from '../components/intro/intro'
import News from '../components/news/news'
import Streaming from '../components/streaming/streaming'
import { getEvents } from '../lib/wp/events'
import { getGuests } from '../lib/wp/guests'
import { getPosts } from '../lib/wp/news'
import { getSponsors } from '../lib/wp/sponsor'
import { getTranslation, getTranslations } from '../lib/wp/translations'
import AppContext from '../store/AppContext'
import {
  EventType,
  GuestType,
  PartnerType,
  TranslationType,
  wpNews,
} from '../store/types'
import currentLocale from '../utils/currentLocale'

const Home = ({
  guests,
  news,
  sponsors,
  translations,
  events,
}: {
  guests: GuestType[]
  news: wpNews
  sponsors: PartnerType[]
  translations: TranslationType[]
  events: EventType[]
}) => {
  const context = useContext(AppContext)
  const router = useRouter()
  const { state, setTranslations } = context
  const [showStreaming, setShowStreaming] = useState(false)
  const currentDate = Date.parse(new Date().toISOString())

  useEffect(() => {
    const dateStart = Date.parse('2022-07-01T17:30:00')
    // const dateStartStreaming = Date.parse('2022-07-01T19:00:00')
    // const dateEndStreaming = Date.parse('2022-07-03T21:00:00')
    console.log(new Date())
    if (currentDate > dateStart) {
      setShowStreaming(true)
    }
  }, [currentDate])

  useEffect(() => {
    if (setTranslations) setTranslations(translations)
  }, [translations, setTranslations, router])

  const ospitiSection = {
    title: getTranslation(
      state?.translations,
      'bottone_ospiti_home',
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      'bottone_ospiti_home',
      state?.language,
      'link'
    ),
    target: '',
  }

  const streamingSection = {
    title: getTranslation(
      state?.translations,
      'bottone_streaming_home',
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      'bottone_streaming_home',
      state?.language,
      'link'
    ),
    target: '',
  }

  const newsSection = {
    title: getTranslation(
      state?.translations,
      'bottone_news_home',
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      'bottone_news_home',
      state?.language,
      'link'
    ),
    target: '',
  }

  const sponsorSection = {
    title: getTranslation(
      state?.translations,
      'bottone_sponsor_home',
      state?.language
    ),
    url: getTranslation(
      state?.translations,
      'bottone_sponsor_home',
      state?.language,
      'link'
    ),
    target: '',
  }

  return (
    <>
      <Intro />

      <>
        <HomeSection
          title={getTranslation(
            state?.translations,
            'titolo_ospiti_home',
            state?.language
          )}
          linkTo={ospitiSection}
        >
          <Anteprima data={guests} />
        </HomeSection>
        {showStreaming && (
          <HomeSection
            bgColor="whitesmoke"
            title={getTranslation(
              state?.translations,
              'titolo_streaming_home',
              state?.language
            )}
            linkTo={streamingSection}
            showButton={true}
          >
            <Streaming data={events} />
          </HomeSection>
        )}

        {news && (
          <HomeSection
            bgColor="#f1e596"
            title={getTranslation(
              state?.translations,
              'titolo_news_home',
              state?.language
            )}
            linkTo={newsSection}
          >
            <News data={news} />
          </HomeSection>
        )}

        <HomeSection
          title={getTranslation(
            state?.translations,
            'titolo_sponsor_home',
            state?.language
          )}
          linkTo={sponsorSection}
        >
          <HomePartner data={sponsors} />
        </HomeSection>
      </>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const guests = await getGuests()
  const news = await getPosts(1, currentLocale(context.locale))
  const sponsors = await getSponsors('sostenuto-da')
  const translations = await getTranslations(currentLocale(context.locale))

  const events = await getEvents()
  let latestNews = null
  if (Array.isArray(news) && news.length > 0) {
    latestNews = news[0]
  }

  return {
    props: {
      guests,
      news: latestNews,
      sponsors,
      translations,
      events,
    },
    //revalidate: 10800,
  }
}

export default Home
