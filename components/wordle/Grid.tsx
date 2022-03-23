import React from 'react'
import { EmptyRow } from './EmptyRow'
import { TriedRow } from './TriedRow'
import { CharStatus } from './util'

type Props = {
  tries: CharStatus[][]
  maxChallenges: number
}

export const Grid = ({ tries, maxChallenges }: Props) => {
  const empties =
    tries.length < 6 ? Array.from(Array(maxChallenges - tries.length)) : []
  return (
    <>
      <div className='pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow'>
        <div className='pb-6 grow'>
          {tries.map((onceTry: CharStatus[], index: number) => {
            return <TriedRow key={index} onceTry={onceTry} />
          })}
          {empties.map((_, index) => {
            return <EmptyRow key={maxChallenges - index} />
          })}
        </div>
      </div>
    </>
  )
}
