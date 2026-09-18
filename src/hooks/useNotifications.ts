import { useEffect, useState } from 'react'

export const TARGET_DATE = new Date('2026-11-19T00:00:00+05:30').getTime()

const REMINDERS = [
  { key: '30-days', label: '30 days', offset: 30 * 86_400_000 },
  { key: '7-days', label: '7 days', offset: 7 * 86_400_000 },
  { key: '24-hours', label: '24 hours', offset: 86_400_000 },
  { key: '1-hour', label: '1 hour', offset: 3_600_000 },
  { key: 'launch', label: 'launch', offset: 0 },
]

const STORAGE_KEY = 'gta6-notifications-enabled'
const SENT_KEY = 'gta6-notifications-sent'

function canNotify() {
  return typeof window !== 'undefined' && 'Notification' in window
}

async function showNotification(title: string, body: string) {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, { body, tag: 'gta6-countdown' })
    return
  }

  new Notification(title, { body, tag: 'gta6-countdown' })
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    canNotify() ? Notification.permission : 'denied',
  )
  const [enabled, setEnabled] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    void navigator.serviceWorker.register('/notifications-sw.js')
  }, [])

  useEffect(() => {
    if (!enabled || permission !== 'granted') return

    const timers = REMINDERS.map((reminder) => {
      const delay = TARGET_DATE - reminder.offset - Date.now()
      if (delay <= 0) return undefined

      return window.setTimeout(() => {
        const sent = JSON.parse(localStorage.getItem(SENT_KEY) ?? '[]') as string[]
        if (sent.includes(reminder.key)) return

        const body = reminder.key === 'launch'
          ? 'GTA VI is now available. Welcome to Leonida.'
          : `${reminder.label} until GTA VI launches.`

        void showNotification('GTA VI Countdown', body)
        localStorage.setItem(SENT_KEY, JSON.stringify([...sent, reminder.key]))
      }, delay)
    })

    return () => timers.forEach((timer) => timer !== undefined && window.clearTimeout(timer))
  }, [enabled, permission])

  const enableNotifications = async () => {
    if (!canNotify()) return
    const nextPermission = await Notification.requestPermission()
    setPermission(nextPermission)
    if (nextPermission === 'granted') {
      localStorage.setItem(STORAGE_KEY, 'true')
      setEnabled(true)
    }
  }

  const disableNotifications = () => {
    localStorage.removeItem(STORAGE_KEY)
    setEnabled(false)
  }

  return {
    enabled,
    permission,
    supported: canNotify(),
    enableNotifications,
    disableNotifications,
  }
}