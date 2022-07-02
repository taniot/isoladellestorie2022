import Link from 'next/link'
import { FC } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import styles from './section.module.scss'
interface Section {
  title: string
  bgColor?: string
  linkTo?: {
    title: string
    url: string
  }
  showButton?: boolean
  children: React.ReactNode
  paddingY?: number
  target?: string
}

const HomeSection: FC<Section> = (props) => {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const {
    title,
    bgColor = 'white',
    linkTo,
    children,
    showButton = true,
    paddingY = isMobile ? 50 : 100,
    target = '_self',
  } = props
  return (
    <div
      className={styles.section}
      style={{
        backgroundColor: bgColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      {children}
      {showButton && linkTo && target === '_self' && (
        <Link href={linkTo?.url} title={linkTo?.title} prefetch={false}>
          <a className={styles.button}>{linkTo?.title}</a>
        </Link>
      )}
      {showButton && linkTo && target === '_blank' && (
        <a
          className={styles.button}
          href={linkTo?.url}
          title={linkTo?.title}
          target="_blank"
          rel="noreferrer"
        >
          {linkTo?.title}
        </a>
      )}
    </div>
  )
}

export default HomeSection
