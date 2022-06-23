import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { setOreGroups } from '../../lib/wp/events'
import { EventType, EventTypeTimeGroups } from '../../store/types'
import Laboratorio from '../evento/laboratorio'
import styles from './eventi.module.scss'

const LaboratoriList = ({ eventi }: { eventi: EventType[] }) => {
  const [eventiGroups, setEventiGroups] = useState<EventTypeTimeGroups[]>([])

  useEffect(() => {
    const groups = setOreGroups(eventi)
    setEventiGroups(groups)
  }, [eventi])

  return (
    <div className="w-10/12 mx-auto">
      {eventiGroups?.map((group) => {
        const result = eventi?.filter(
          (evento: EventType) =>
            evento.oraInizio === group.oraInizio &&
            evento.oraFine === group.oraFine
        )
        return (
          <div key={uuidv4()} className={styles.eventContainer}>
            <div className={styles.timeContainer}>
              <p className={styles.mainTime}>
                {group.oraInizio}
                {group.oraFine && ` - ${group.oraFine}`}
              </p>
            </div>
            <div className={styles.labContainer}>
              {result?.map((evento: EventType) => (
                <Laboratorio key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LaboratoriList
