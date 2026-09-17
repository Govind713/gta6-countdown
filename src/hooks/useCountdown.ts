import { useEffect, useState } from 'react'

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isLaunched: boolean
}

const TARGET_DATE = new Date('2026-11-19T00:00:00+05:30').getTime()

function getTimeRemaining(): CountdownTime {
  const difference = Math.max(0, TARGET_DATE - Date.now())

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    isLaunched: difference === 0,
  }
}

export function useCountdown(): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(getTimeRemaining)

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTimeRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return time
}
