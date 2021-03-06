import moment from 'moment'
import type { CodeBlock } from 'notion-types'
import { getBlockTitle } from 'notion-utils'
import * as React from 'react'
import { useState } from 'react'
import { useNotionContext } from 'react-notion-x'
import { FlipDate } from './FlipDate'
import { Grid } from './Grid'
import { CharStatus, DayResult, parseDay } from './util'

const firstWordleDay = moment('2021-06-19')

export const Hello: React.FC<{ message: string }> = ({ message = 'world' }) => {
  return <div>{message}</div>
}

type DarkModeProps = { darkMode?: boolean }
type WordleCodeProps = { block: CodeBlock }
export type WordleCodeFunc = (props: DarkModeProps) => React.FC<WordleCodeProps>

export const WordleCode: WordleCodeFunc = ({ darkMode = false }) => {
  const RealWordleCode: React.FC<WordleCodeProps> = ({ block }) => {
    const ctx = useNotionContext()
    const code = getBlockTitle(block, ctx.recordMap)
    const dayResults = code.split('\n\n').reduce((map, result) => {
      const dayResult = parseDay(result)
      if (dayResult) {
        map[dayResult.index] = dayResult
      }
      return map
    }, {})

    const [date, setDate] = useState(moment())
    const [previousDate, setPreviousDate] = useState(
      moment().clone().subtract(1, 'days')
    )

    const [yearShuffle, setYearShuffle] = useState(false)
    const [monthShuffle, setMonthShuffle] = useState(false)
    const [dateShuffle, setDateShuffle] = useState(false)

    const addDate = () => {
      const newDate = date.clone().add(1, 'days')
      setDateShuffle(!dateShuffle)
      if (newDate.month() !== date.month()) {
        setMonthShuffle(!monthShuffle)
      }
      if (newDate.year() !== date.year()) {
        setYearShuffle(!yearShuffle)
      }
      setPreviousDate(date.clone())
      setDate(newDate)
    }

    const minusDate = () => {
      const newDate = date.clone().subtract(1, 'days')
      setDateShuffle(!dateShuffle)
      if (newDate.month() !== date.month()) {
        setMonthShuffle(!monthShuffle)
      }
      if (newDate.year() !== date.year()) {
        setYearShuffle(!yearShuffle)
      }
      setPreviousDate(date.clone())
      setDate(newDate)
    }
    const daySinceFirstWordle = date.diff(firstWordleDay, 'days')
    const dayResult: DayResult = dayResults[daySinceFirstWordle]
    const tries: CharStatus[][] = dayResult ? dayResult.tries : []

    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <FlipDate
          date={date}
          previousDate={previousDate}
          addDate={addDate}
          minusDate={minusDate}
          dateShuffle={dateShuffle}
          monthShuffle={monthShuffle}
          yearShuffle={yearShuffle}
          darkMode={darkMode}
        />
        <Grid tries={tries} maxChallenges={6} />
      </div>
    )
  }
  return RealWordleCode
}
