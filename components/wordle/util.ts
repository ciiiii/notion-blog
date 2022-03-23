import Graphemer from 'graphemer'

export type CharStatus = 'correct' | 'present' | 'absent' | any

export type DayResult = {
  index: number
  tries: CharStatus[][]
}

const parseStatus = (result: string): CharStatus => {
  if (result === '🟩') {
    return 'correct'
  }
  if (result === '🟨') {
    return 'present'
  }
  return 'absent'
}

// Example:
// Wordle 277 3/6
// ⬛🟨🟩⬛⬛
// ⬛⬛🟩🟨⬛
// 🟩🟩🟩🟩🟩
const parseDay = (result: string): DayResult => {
  const splitter = new Graphemer()
  const answers = result.split('\n')
  if (answers.length < 2) {
    return null
  }
  const summary = answers[0].split(' ')
  const tries = answers.slice(1)
  return {
    index: parseInt(summary[1]),
    tries: tries.map((line) => splitter.splitGraphemes(line).map(parseStatus))
  }
}

export { parseDay }
