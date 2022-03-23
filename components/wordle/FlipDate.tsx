import moment from 'moment'
import * as React from 'react'
import { useRef } from 'react'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'
import styles from './FlipDate.module.sass'

const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`${styles.flipCard} ${styles[animation]}`}>
      <span>{digit}</span>
    </div>
  )
}

const StaticCard = ({
  position,
  digit
}: {
  position: 'upperCard' | 'lowerCard'
  digit: string
}) => {
  return (
    <div className={styles[position]}>
      <span>{digit}</span>
    </div>
  )
}

const FlipUnitContainer = ({
  current,
  previous,
  shuffle
}: {
  current: number
  previous: number
  shuffle: boolean
  unit?: string
}) => {
  const currentDigitStr = current < 10 ? `0${current}` : current.toString()
  const previousDigitStr = previous < 10 ? `0${previous}` : previous.toString()

  const digit1 = shuffle ? previousDigitStr : currentDigitStr
  const digit2 = !shuffle ? previousDigitStr : currentDigitStr

  const animation1 = shuffle ? 'fold' : 'unfold'
  const animation2 = !shuffle ? 'fold' : 'unfold'

  return (
    <div className={styles.flipUnitContainer}>
      <StaticCard position={'upperCard'} digit={currentDigitStr} />
      <StaticCard position={'lowerCard'} digit={previousDigitStr} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  )
}

const darkClickBackGroundColor = '255, 255, 255'
const lightClickBackGroundColor = '0, 0, 0'

const clickWithAnimation = (
  trigger: (e: React.MouseEvent<HTMLInputElement>) => void,
  darkMode: boolean,
  ref: React.MutableRefObject<any>
) => {
  return (e: React.MouseEvent<HTMLInputElement>) => {
    let size = 0
    let opacity = 0.25
    const addButtonClick = () => {
      size += 8
      opacity -= 0.008
      const offset = ref.current.getBoundingClientRect()
      const newX = e.clientX - offset.left
      const newY = e.clientY - offset.top
      const color = getComputedStyle(ref.current).backgroundColor
      ref.current.style.background = `${color} radial-gradient(circle at ${newX}px ${newY}px, rgba(${
        darkMode ? darkClickBackGroundColor : lightClickBackGroundColor
      },${opacity}) ${size}%, transparent ${size + 2}%) no-repeat`
      if (size <= 300) {
        requestAnimationFrame(addButtonClick)
      } else {
        ref.current.style.background = ''
      }
    }
    addButtonClick()
    trigger(e)
  }
}

type Props = {
  date: moment.Moment
  previousDate: moment.Moment
  dateShuffle: boolean
  monthShuffle: boolean
  yearShuffle: boolean
  addDate: (e: React.MouseEvent<HTMLInputElement>) => void
  minusDate: (e: React.MouseEvent<HTMLInputElement>) => void
  darkMode: boolean
}

export function FlipDate({
  date,
  previousDate,
  dateShuffle,
  monthShuffle,
  yearShuffle,
  addDate,
  minusDate,
  darkMode
}: Props) {
  const addButton = useRef(null)
  const minusButton = useRef(null)
  return (
    <div className='flex md:items-center justify-center'>
      <div className={`${styles.flipClock}`}>
        <FlipUnitContainer
          current={date.year()}
          previous={previousDate.year()}
          shuffle={yearShuffle}
          unit={'years'}
        />
        <FlipUnitContainer
          current={date.month() + 1}
          previous={previousDate.month() + 1}
          shuffle={monthShuffle}
          unit={'months'}
        />
        <FlipUnitContainer
          current={date.date()}
          previous={previousDate.date()}
          shuffle={dateShuffle}
          unit={'days'}
        />
        <div className={styles.button}>
          <div
            ref={addButton}
            className={styles.upperButton}
            onClick={clickWithAnimation(addDate, darkMode, addButton)}
          >
            <BiUpArrow size={'1.5em'} />
          </div>
          <div
            ref={minusButton}
            className={styles.lowerButton}
            onClick={clickWithAnimation(minusDate, darkMode, minusButton)}
          >
            <BiDownArrow size={'1.5em'} />
          </div>
        </div>
      </div>
    </div>
  )
}
