import { MailIcon } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from 'react'
import { BiWorld } from 'react-icons/bi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'
import { setLuogoGroups } from '../../lib/wp/places'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import { Page, PlaceGroupType, PlaceType } from '../../store/types'
import styles from './places.module.scss'

const Places = ({ data }: { data: PlaceType[]; page: Page }) => {
  const { state } = useContext(AppContext)

  const [placesGroups, setPlacesGroups] = useState<PlaceGroupType[]>([])
  useEffect(() => {
    if (data) {
      const groups = setLuogoGroups(data)
      setPlacesGroups(groups)
    }
  }, [data])

  return (
    <div className={styles.placesSection}>
      {placesGroups?.map((group: PlaceGroupType) => {
        const places = data
          .filter((place: PlaceType) => place.city.slug === group.slug)
          .sort((a: PlaceType, b: PlaceType) => a.title.localeCompare(b.title))

        return (
          <div key={uuidv4()} className="flex flex-col  mb-10">
            <div className={styles.whereContainer}>
              <p className={styles.where}>{group.luogo.toUpperCase()}</p>
              {group.distanza && (
                <p className={styles.theme}>
                  {group.distanza}{' '}
                  {getTranslation(
                    state?.translations,
                    'km_da_gavoi',
                    state?.language
                  )}
                </p>
              )}
            </div>

            <div className={styles.placesContainer}>
              {places?.map((place: PlaceType) => {
                return (
                  <div key={uuidv4()} className={styles.place}>
                    <div className={styles.placeBox}>
                      <div className={styles.title}>{place.title}</div>
                      <div className={styles.description}>{place.address}</div>
                      <div className={styles.icons}>
                        {place.phone1 && (
                          <a href={`tel:${place.phone1}`}>
                            <div className={styles.icon}>
                              <BsFillTelephoneFill className="w-4 h-4" />
                            </div>
                          </a>
                        )}

                        {place.email && (
                          <a
                            href={`mailto:${place.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className={styles.icon}>
                              <MailIcon className="w-4 h-4" />
                            </div>
                          </a>
                        )}
                        {place.web && (
                          <a
                            href={`${place.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className={styles.icon}>
                              <BiWorld className="w-4 h-4" />
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Places
