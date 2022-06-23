import { GetStaticPaths, GetStaticProps } from 'next'

import Guest from '../../components/guest/guest'
import { getGuestBySlug, getGuests } from '../../lib/wp/guests'
import { getTranslations } from '../../lib/wp/translations'
import { useContext, useEffect } from 'react'
import AppContext from '../../store/AppContext'
import { TranslationType, GuestType } from '../../store/types'
import Seo from '../../components/seo/seo'

const Ospite = ({
  guest,
  translations,
}: {
  guest: GuestType
  translations: TranslationType[]
}) => {
  const context = useContext(AppContext)
  const { setTranslations } = context

  useEffect(() => {
    if (setTranslations) setTranslations(translations)
  }, [setTranslations, translations])
  return (
    <>
      <Seo title={guest?.title} />
      <Guest guest={guest} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const guests = await getGuests()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathsIt = guests?.map((guest: any) => {
    return {
      params: {
        slug: guest.slug,
      },
      locale: 'it',
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathsEn = guests?.map((guest: any) => {
    return {
      params: {
        slug: guest.slug,
      },
      locale: 'en',
    }
  })

  const paths = [...pathsIt, ...pathsEn]

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug

  let guest = null
  const translations = await getTranslations()
  if (typeof slug === 'string') guest = await getGuestBySlug(slug)

  return {
    props: {
      guest,
      translations,
    },
    //revalidate: 10800,
  }
}

export default Ospite
