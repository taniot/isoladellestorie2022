import { Page } from '../../store/types'
import SelectDay from '../selectDay/selectDay'
import Seo from '../seo/seo'
import styles from './pageHeader.module.scss'

const PageHeader = ({ page }: { page?: Page }) => {
  return (
    <>
      <Seo
        title={
          page
            ? page?.parent?.title
              ? `${page?.parent?.title} - ${page?.title}`
              : `${page?.title}`
            : ''
        }
      />

      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeader}>
          <h1>{page?.parent?.title || page?.title || null}</h1>
          <h2>
            {(page?.parent?.title && page?.title) || page?.subtitleIt || null}
          </h2>
          {page?.template === 'eventi' && <SelectDay page={page} />}
        </div>
      </div>
    </>
  )
}

export default PageHeader
