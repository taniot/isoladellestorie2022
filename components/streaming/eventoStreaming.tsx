import { getEventFieldByLang } from '../../lib/wp/events'
import { EventType } from '../../store/types'
import { useContext } from 'react'
import AppContext from '../../store/AppContext'
import parse from 'html-react-parser'
import classNames from 'classnames'
import styles from './eventoStreaming.module.scss'
const EventoStreaming = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext)
  return (
    <div className={styles.streaming}>
      <span className={styles.time}>{evento.oraInizio}</span>
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>
          {getEventFieldByLang(evento, 'title', state?.language)}
        </h4>
      )}
      <div
        className={classNames(
          styles.description,
          evento.nascondiTitolo && styles.noTitle
        )}
      >
        {parse(
          getEventFieldByLang(evento, 'description', state?.language)
            ? getEventFieldByLang(evento, 'description', state?.language)
            : ''
        )}
      </div>
    </div>
  )
}

export default EventoStreaming
