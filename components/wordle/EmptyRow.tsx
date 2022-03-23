import React from 'react'
import { Cell } from './Cell'

export function EmptyRow() {
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
      {Array.from(Array(5)).map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
