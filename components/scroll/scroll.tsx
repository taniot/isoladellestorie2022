import cls from 'classnames'
import { useEffect, useState } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import styles from './scroll.module.scss'

const Scroll = () => {
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    })
  }, [showBtn])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {showBtn && (
        <div className={styles.topToBtn} onClick={goToTop}>
          <BsFillArrowUpCircleFill className={cls(styles.icon, 'icon')} />
        </div>
      )}
    </>
  )
}

export default Scroll
