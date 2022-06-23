import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getGroupsLuogoFieldByLang, setLuogoGroups } from '../../lib/wp/events'
import AppContext from '../../store/AppContext'
import { EventType, EventTypeLuogoGroups } from '../../store/types'
import Mostra from '../evento/mostra'
import styles from './eventi.module.scss'

const MostraList = ({ eventi }: { eventi: EventType[] }) => {
  const context = useContext(AppContext)
  const { state } = context

  const [eventiGroups, setEventiGroups] = useState<EventTypeLuogoGroups[]>([])

  useEffect(() => {
    const groups = setLuogoGroups(eventi)

    setEventiGroups(groups)
  }, [eventi])

  return (
    <section>
      <div className="w-10/12 lg:w-7/12 mx-auto">
        {eventiGroups?.map((group) => {
          const result = eventi.filter(
            (evento: EventType) => evento.luogo === group.luogo
          )
          return (
            <div
              key={uuidv4()}
              className={classNames(
                styles.eventContainer,
                styles.mostreContainer
              )}
            >
              <div className={styles.luogoContainer}>
                <h3 className={styles.where}>
                  {getGroupsLuogoFieldByLang(
                    group,
                    'luogo',
                    state?.language
                  ).toUpperCase()}
                </h3>
                {getGroupsLuogoFieldByLang(group, 'info', state?.language) && (
                  <div className={styles.theme}>
                    {getGroupsLuogoFieldByLang(group, 'info', state?.language)}
                  </div>
                )}
              </div>

              {result?.map((evento: EventType) => (
                <Mostra key={evento.id} evento={evento} />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MostraList
