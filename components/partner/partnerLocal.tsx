import { PartnerType } from '../../store/types'
import styles from './partnerLocal.module.scss'
import AppContext from '../../store/AppContext'
import { useContext } from 'react'
const PartnerLocal = ({ data }: { data: PartnerType[] }) => {
  const { state } = useContext(AppContext)

  return (
    <div className={styles.partnerContainer}>
      <p className={styles.description}>
        {state?.language === 'it'
          ? `Un ringraziamento agli esercizi commerciali che con il loro contributo
      hanno preso parte alla buona riuscita della XVII edizione del Festival
      Letterario della Sardegna- L’Isola delle Storie.`
          : `Thanks to the businesses that contributed to the success of the 17th edition of the Literary Festival of Sardinia - L’Isola delle Storie.`}
      </p>
      {data.map((sponsor) => (
        <p key={sponsor.title} className={styles.sponsor}>
          {sponsor.title}
        </p>
      ))}
    </div>
  )
}

export default PartnerLocal
