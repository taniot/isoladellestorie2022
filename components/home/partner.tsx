import cls from 'classnames'
import Image from 'next/image'
import { PartnerType } from '../../store/types'
import styles from './partner.module.scss'

const HomePartner = ({ data }: { data: PartnerType[] }) => {
  if (!data) return null
  return (
    <div className={styles.container}>
      <div className={styles.sponsor_list}>
        {data?.map((sponsor: PartnerType) => (
          <div key={sponsor.title} className={styles.sponsorContainer}>
            {sponsor.image ? (
              <a
                key={sponsor.title}
                href={sponsor.link}
                title={sponsor.title}
                target="_blank"
                rel="noreferrer"
                className={styles.sponsor}
              >
                <Image
                  src={sponsor.image}
                  layout="responsive"
                  height={100}
                  width={200}
                  alt={sponsor.title}
                  objectFit="contain"
                  objectPosition="center"
                  priority
                />
              </a>
            ) : (
              <a
                key={sponsor.title}
                href={sponsor.link}
                title={sponsor.title}
                target="_blank"
                rel="noreferrer"
                className={cls(styles.sponsor, styles.noImage)}
              >
                <span>{sponsor.title}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePartner
