import cls from 'classnames'
import styles from './about.module.scss'

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <div className={cls(styles.section)}>
          <div className={styles.imageContainer}>image</div>
          <div className={styles.textContainer}>text</div>
        </div>
        <div className={cls(styles.section, styles.reverse)}>
          <div className={styles.imageContainer}>image</div>
          <div className={styles.textContainer}>text</div>
        </div>
      </div>
    </div>
  )
}

export default About
