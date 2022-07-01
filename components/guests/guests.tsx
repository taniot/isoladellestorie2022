import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getGuestFieldByLang } from '../../lib/wp/guests'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import { GuestType } from '../../store/types'
import styles from './guests.module.scss'
import GuestsLoading from './guestsLoading'
import GuestImage from './image'

const useGuests = (data: GuestType[]) => {
  const [posts, setPosts] = useState<GuestType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setPosts(data)
    setIsLoading(false)
  }, [data])

  return {
    posts,
    isLoading,
  }
}

const Guests = ({ data }: { data: GuestType[] }) => {
  const { state } = useContext(AppContext)
  const { posts, isLoading } = useGuests(data)

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <div className={styles.grid_list}>
            {isLoading && <GuestsLoading />}
            {posts?.map((data: GuestType) => (
              <div key={uuidv4()} className={styles.grid_item}>
                <a
                  className={styles.grid_item_link}
                  href={`${getTranslation(
                    state?.translations,
                    'menu_ospiti',
                    state?.language,
                    'link'
                  )}${data.slug}/`}
                >
                  <GuestImage
                    title={data.title}
                    image={data.image}
                    borderColor="#e6cd00"
                  />

                  <h2 className={styles.grid_item_title}>{data.title}</h2>
                  <p className={styles.grid_item_description}>
                    {getGuestFieldByLang(data, 'jobTitle', state?.language)}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Guests
