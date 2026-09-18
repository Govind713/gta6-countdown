import { Check, Download, Link, Share2 } from 'lucide-react'
import { useState } from 'react'

interface ShareActionsProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getShareText(days: number, hours: number, minutes: number, seconds: number) {
  if (days > 0) return `Only ${days} days until GTA VI.`
  if (hours > 0) return `Only ${hours} hours until GTA VI.`
  if (minutes > 0) return `Only ${minutes} minutes until GTA VI.`
  return `Only ${seconds} seconds until GTA VI.`
}

function createShareImage(days: number, hours: number, minutes: number, seconds: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const context = canvas.getContext('2d')
  if (!context) return null

  const background = context.createLinearGradient(0, 0, 1200, 630)
  background.addColorStop(0, '#0a0518')
  background.addColorStop(0.58, '#321142')
  background.addColorStop(1, '#f43f5e')
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'rgba(6, 182, 212, 0.14)'
  context.beginPath()
  context.arc(1040, 110, 270, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = '#f97316'
  context.font = '700 24px monospace'
  context.letterSpacing = '6px'
  context.fillText('WELCOME BACK TO LEONIDA', 78, 100)

  context.fillStyle = '#ffffff'
  context.font = '900 92px sans-serif'
  context.fillText('GTA VI', 74, 220)

  context.fillStyle = '#f8f6ff'
  context.font = '500 31px monospace'
  context.fillText('LAUNCH COUNTDOWN', 80, 290)

  context.fillStyle = '#ffffff'
  context.font = '500 76px monospace'
  context.fillText(
    `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`,
    78,
    410,
  )

  context.fillStyle = 'rgba(255, 255, 255, 0.72)'
  context.font = '500 22px monospace'
  context.fillText('19 NOV 2026  |  FAN-MADE COUNTDOWN', 82, 490)
  context.fillStyle = '#ffffff'
  context.font = '700 20px sans-serif'
  context.fillText('gta6-countdown', 82, 560)

  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export function ShareActions({ days, hours, minutes, seconds }: ShareActionsProps) {
  const [status, setStatus] = useState('')
  const shareText = getShareText(days, hours, minutes, seconds)

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setStatus('LINK COPIED')
  }

  const share = async () => {
    const url = window.location.href
    const image = await createShareImage(days, hours, minutes, seconds)
    const file = image ? new File([image], 'gta-vi-countdown.png', { type: 'image/png' }) : null

    if (navigator.share) {
      const shareData = { title: 'GTA VI Launch Countdown', text: shareText, url }
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] })
      } else {
        await navigator.share(shareData)
      }
      setStatus('SHARED')
      return
    }

    await navigator.clipboard.writeText(`${shareText} ${url}`)
    setStatus('TEXT COPIED')
  }

  const downloadImage = async () => {
    const image = await createShareImage(days, hours, minutes, seconds)
    if (!image) return
    const imageUrl = URL.createObjectURL(image)
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'gta-vi-countdown.png'
    link.click()
    URL.revokeObjectURL(imageUrl)
    setStatus('IMAGE SAVED')
  }

  return (
    <div className="share-actions" aria-label="Share countdown">
      <button type="button" onClick={share} title="Share countdown">
        <Share2 size={16} /> <span>SHARE</span>
      </button>
      <button type="button" onClick={copyLink} title="Copy shareable link">
        {status === 'LINK COPIED' ? <Check size={16} /> : <Link size={16} />} <span>{status === 'LINK COPIED' ? status : 'COPY LINK'}</span>
      </button>
      <button type="button" onClick={downloadImage} title="Save countdown image">
        <Download size={16} /> <span>SAVE IMAGE</span>
      </button>
      <span className="share-status" aria-live="polite">{status && status !== 'LINK COPIED' ? status : ''}</span>
    </div>
  )
}