import classnames from 'classnames'
import React from 'react'
import { CharStatus } from './util'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  position?: number
}

export function Cell({ value, status, position = 0 }: Props) {
  const animationDelay = `${position * 350}ms`
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white :bg-slate-900 border-slate-200 dark:border-slate-600': !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct',
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present'
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div style={{ animationDelay }}>{value}</div>
    </div>
  )
}
