import React from 'react'
import { Cell } from './Cell'
import { CharStatus } from './util'

type Props = {
  onceTry: CharStatus[]
}

export function TriedRow({ onceTry }: Props) {
  return (
    <div
      className='flex justify-center mb-1'
      style={{
        // fix margin in class not work with following css
        // -webkit-margin-before: 0
        // margin-block-start: 0
        // -webkit-margin-after: 0
        // margin-block-end: 0
        marginBottom: '0.25rem'
      }}
    >
      {onceTry.map((status, i) => (
        <Cell key={i} status={status} position={i} />
      ))}
    </div>
  )
}
