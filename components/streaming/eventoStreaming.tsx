import { getEventFieldByLang } from '../../lib/wp/events'
import { EventType } from '../../store/types'
import { useContext } from 'react'
import AppContext from '../../store/AppContext'
import parse from 'html-react-parser'
import classNames from 'classnames'
import styles from './eventoStreaming.module.scss'
import { AiFillYoutube } from 'react-icons/ai'
import { format } from 'date-fns'
import it from 'date-fns/locale/it'
const EventoStreaming = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext)
  return (
    <div className={styles.streaming}>
      <p className={styles.quando}>
        <span className={styles.video}>
          <AiFillYoutube />
        </span>
        <span className={styles.time}>
          {!evento.currentLive &&
            !evento.finished &&
            ` ${format(evento.dataOrdA, 'd MMMM', { locale: it })} ore ${' '}
          ${format(evento.dataOrdA, 'H:mm', { locale: it })}`}
          {evento.currentLive && `Live Streaming`}
          {evento.finished && `Evento concluso`}
        </span>
      </p>

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

      {evento.tipologiaName && !evento.tipologia?.includes('segnaposto') && (
        <p className={styles.tipologia}>{evento.tipologiaName}</p>
      )}
    </div>
  )
}

export default EventoStreaming
