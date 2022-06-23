import classNames from 'classnames'
import { format } from 'date-fns'
import parse from 'html-react-parser'
import Link from 'next/link'
import { useContext } from 'react'
import { BsHandIndexThumb } from 'react-icons/bs'
import { getEventFieldByLang } from '../../lib/wp/events'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import { EventType } from '../../store/types'
import styles from './ospite.module.scss'

const Ospite = ({ evento }: { evento: EventType }) => {
  const { state } = useContext(AppContext)
  return (
    <div
      className={classNames(
        styles.evento,
        evento.eventoPrincipale ? styles.main : ''
      )}
    >
      <span className={styles.time}>
        {format(evento.dataOrdA, 'dd/MM')} - {evento.oraInizio}
      </span>
      {!evento.nascondiTitolo && (
        <h4 className={styles.title}>
          {getEventFieldByLang(evento, 'title', state?.language)}
        </h4>
      )}
      <p className={styles.where}>
        {getEventFieldByLang(evento, 'luogo', state?.language)}
        {evento.tipologiaName &&
          !evento.tipologia?.includes('segnaposto') &&
          ` - ${evento.tipologiaName}`}
      </p>
      <div className={styles.description}>
        {parse(getEventFieldByLang(evento, 'description', state?.language))}
        {getEventFieldByLang(evento, 'note_eta_richiesta', state?.language)}
      </div>
      {getEventFieldByLang(evento, 'info', state?.language) && (
        <div className={styles.description}>
          {parse(getEventFieldByLang(evento, 'info', state?.language))}
        </div>
      )}

      {getEventFieldByLang(evento, 'finanziamento', state?.language) && (
        <div className={styles.finanziamento}>
          {parse(getEventFieldByLang(evento, 'finanziamento', state?.language))}
        </div>
      )}
      {(evento.etaRichiesta || evento.maxIscritti) && (
        <div className={styles.info}>
          <span className={styles.etaLabel}>
            {getEventFieldByLang(evento, 'eta_richiesta', state?.language)}
          </span>
          <span className={styles.maxIscrittiLabel}>
            {getEventFieldByLang(evento, 'max_iscritti', state?.language)}
          </span>
          {evento.prenotazioneOnline && (
            <Link
              href={getTranslation(
                state?.translations,
                'bottone_prenota_online',
                state?.language,
                'link'
              )}
            >
              <a>
                <span className={styles.prenotaOnline}>
                  {getTranslation(
                    state?.translations,
                    'bottone_prenota_online',
                    state?.language
                  )}
                </span>
              </a>
            </Link>
          )}
        </div>
      )}
      {evento.eventoAnnullato && (
        <div className={styles.annullatoMessage}>
          <BsHandIndexThumb className={styles.icon} />
          <span className={styles.text}>
            {getEventFieldByLang(evento, 'annullato', state?.language)}
          </span>
        </div>
      )}
    </div>
  )
}

export default Ospite
