import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import Layout from '../components/layout/layout'
import AppContext from '../store/AppContext'
import { Languages, TranslationType } from '../store/types'
import '../styles/globals.scss'

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof Languages>('it')
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false)
  const [translations, setTranslations] = useState<TranslationType[]>([])

  useEffect(() => {
    TagManager.initialize({ gtmId: GOOGLE_TAG_MANAGER_ID })
  }, [])

  useEffect(() => {
    console.log('cambio lingua?')
    if (router.locale === 'it' || router.locale === 'en')
      setCurrentLanguage(router.locale)
  }, [router.locale])

  useEffect(() => {
    document.body.className = isMainMenuOpen ? 'menu-open' : 'menu-closed'
  }, [isMainMenuOpen])

  return (
    <AppContext.Provider
      value={{
        state: {
          language: currentLanguage,
          isMainMenuOpen,
          translations,
        },
        setIsMainMenuOpen,
        setCurrentLanguage,
        setTranslations,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
