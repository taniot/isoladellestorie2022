import styles from './guests.module.scss'
import GuestImage from './image'
import { v4 as uuidv4 } from 'uuid'
const GuestsLoading = () => {
  const demo = new Array(9).fill('')
  return (
    <>
      {demo.map(() => (
        <div key={uuidv4()} className={styles.grid_item}>
          <a className={styles.grid_item_link}>
            <GuestImage title="loading" borderColor="#e6cd00" />
          </a>
        </div>
      ))}
    </>
  )
}

export default GuestsLoading
