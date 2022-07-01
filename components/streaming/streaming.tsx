import styles from './streaming.module.scss'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import cls from 'classnames'
import { EventType } from '../../store/types'
import { useEffect, useState } from 'react'
import EventoStreaming from './eventoStreaming'
import { format } from 'date-fns-tz'

const Streaming = ({ data }: { data: EventType[] }) => {
  const [options] = useState({})
  const [ref, slider] = useKeenSlider<HTMLDivElement>(options)
  const [streaming, setStreaming] = useState<EventType[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(
      streaming.findIndex(
        (element) => element.currentLive === true || element?.finished === false
      )
    )
  }, [streaming])

  useEffect(() => {
    slider.current?.moveToIdx(currentIndex)
    slider?.current?.update(
      {
        breakpoints: {
          '(min-width: 700px)': {
            slides: { perView: 1.5, spacing: 10 },
          },
          '(min-width: 1180px)': {
            slides: { perView: 2.5, spacing: 10 },
          },
        },
        slides: { origin: 'center', perView: 1, spacing: 10 },
      },
      currentIndex
    )
  }, [slider, currentIndex])

  useEffect(() => {
    const theDate = format(new Date(), 'yyyy-MM-dd')
    const theTime = format(new Date(), 'HH:mm:ss')
    const myDate = `${theDate}T${theTime}`
    const currentDate = Date.parse(myDate)

    const result = data
      .filter((event) => event.streaming === true)
      .map((event) => {
        // console.log('title', event.title)
        // console.log('currentDate', currentDate)
        // console.log('theDate', theDate)
        // console.log('theTime', theTime)
        // console.log('myDate', myDate)
        console.log('currentDate', currentDate)
        console.log('dataA', event.dataOrdA)
        console.log('dataB', event.dataOrdB)

        return {
          ...event,
          currentLive:
            currentDate >= event.dataOrdA && currentDate <= event.dataOrdB
              ? true
              : false,
          finished: currentDate > event.dataOrdB,
        }
      })

    setStreaming(result)
  }, [data])

  return (
    <section className={styles.container}>
      {slider && (
        <div
          ref={ref}
          className={cls(styles.streamingContainer, 'keen-slider')}
        >
          {streaming?.map((event) => {
            return (
              <div
                key={event.id}
                className={cls(
                  'keen-slider__slide',
                  styles.number_slide,
                  event?.currentLive && styles.live,
                  event?.finished && styles.finished
                )}
              >
                <EventoStreaming evento={event} />
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Streaming
