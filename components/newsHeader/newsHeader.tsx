import { wpNews } from '../../store/types'
import styles from './newsHeader.module.scss'

const NewsHeader = ({ page }: { page: wpNews }) => (
  <div className={styles.pageHeaderContainer}>
    <div className={styles.pageHeader}>
      <h1>News</h1>
      <h2>{page.title}</h2>
    </div>
  </div>
)

export default NewsHeader
