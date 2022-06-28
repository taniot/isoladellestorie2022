import Image from 'next/image'
import { FC } from 'react'
import styles from './image.module.scss'

interface GuestImg {
  title: string
  image?: string | null
  width?: number
  height?: number
  borderColor?: string
}

const GuestImage: FC<GuestImg> = (props) => {
  const {
    title,
    image,
    width = 200,
    height = 200,
    borderColor = '#fff',
  } = props

  return (
    <div className={styles.borderContainer} style={{ borderColor }}>
      <div className={styles.image_container} style={{ width, height }}>
        {image ? (
          <Image
            src={image}
            alt={title}
            priority={true}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        ) : (
          <div className={styles.noImage}>
            <Image
              src="/images/l-isola-delle-storie-favicon-light.svg"
              alt={title}
              priority={true}
              width="100px"
              height="100px"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestImage
