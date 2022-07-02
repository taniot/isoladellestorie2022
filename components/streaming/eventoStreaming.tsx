import { getEventFieldByLang } from '../../lib/wp/events'
import { EventType } from '../../store/types'
import { useContext } from 'react'
import AppContext from '../../store/AppContext'
import parse from 'html-react-parser'
import classNames from 'classnames'
import styles from './eventoStreaming.module.scss'
import { AiFillYoutube } from 'react-icons/ai'
import { getTranslation } from '../../lib/wp/translations'

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
            getEventFieldByLang(evento, 'date_formatted', state?.language)}

          <a
            title="Streaming Live"
            target="_blank"
            rel="noreferrer"
            href={getTranslation(
              state?.translations,
              'live_streaming',
              state?.language,
              'link'
            )}
          >
            {evento.currentLive &&
              getTranslation(
                state?.translations,
                'live_streaming',
                state?.language
              )}
          </a>
          {evento.finished &&
            getTranslation(
              state?.translations,
              'evento_concluso',
              state?.language
            )}
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
        <p className={styles.tipologia}>
          {getEventFieldByLang(evento, 'tipologia', state?.language)}
        </p>
      )}
    </div>
  )
}

export default EventoStreaming
