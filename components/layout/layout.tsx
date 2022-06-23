import { FC, ReactNode } from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import Scroll from '../scroll/scroll'
import Seo from '../seo/seo'
import styles from './layout.module.scss'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Seo />
      <div className={styles.rotate}></div>
      <Scroll />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
