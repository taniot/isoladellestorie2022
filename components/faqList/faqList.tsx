import { FaqType, Page } from '../../store/types'
import Faq from '../faq/faq'
import styles from './faqList.module.scss'

const FaqList = ({ data }: { data: FaqType[]; page: Page }) => {
  return (
    <section className={styles.faqList}>
      <div className={styles.listContainer}>
        {data.map((faq, index) => (
          <Faq key={faq.id} count={index} faq={faq} />
        ))}
      </div>
    </section>
  )
}
export default FaqList
