import styles from './streaming.module.scss'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import cls from 'classnames'
import { EventType } from '../../store/types'
import { useEffect, useState } from 'react'
import EventoStreaming from './eventoStreaming'

const Streaming = ({ data }: { data: EventType[] }) => {
  const [streaming, setStreaming] = useState<EventType[]>([])

  useEffect(() => {
    const result = data.filter((event) => event.streaming === true)

    setStreaming(result)
  }, [data])

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 700px)': {
        slides: { perView: 2.5, spacing: 10 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 2.5, spacing: 10 },
      },
    },
    slides: { origin: 'center', perView: 1, spacing: 10 },
  })

  return (
    <section className={styles.container}>
      <div ref={ref} className={cls(styles.streamingContainer, 'keen-slider')}>
        {streaming?.map((event) => (
          <div
            key={event.id}
            className={cls(
              'keen-slider__slide',
              styles.number_slide,
              styles.live
            )}
          >
            <EventoStreaming evento={event} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Streaming
