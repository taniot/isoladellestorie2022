import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import { Page, wpNews } from '../../store/types'
import NewsLight from '../news/newsLight'
import styles from './newsList.module.scss'

const NewsList = ({ data }: { data: wpNews[]; page: Page }) => {
  const { state } = useContext(AppContext)
  return (
    <div className={styles.container}>
      {data.length === 0 && (
        <div className={styles.notFound}>
          {getTranslation(
            state?.translations,
            'no_news_found',
            state?.language
          )}
        </div>
      )}

      {data?.map((news: wpNews) => {
        return <NewsLight key={uuidv4()} data={news} />
      })}
    </div>
  )
}

export default NewsList
