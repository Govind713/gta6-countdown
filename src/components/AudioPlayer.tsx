import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function AudioPlayer() {
  const [muted, setMuted] = useState(true)
  const audioContext = useRef<AudioContext | null>(null)
  const masterGain = useRef<GainNode | null>(null)
  const oscillators = useRef<OscillatorNode[]>([])

  useEffect(() => {
    return () => {
      oscillators.current.forEach((oscillator) => oscillator.stop())
      audioContext.current?.close()
    }
  }, [])

  const toggleAudio = () => {
    if (!audioContext.current) {
      const context = new AudioContext()
      const gain = context.createGain()
      gain.gain.value = 0.035
      gain.connect(context.destination)

      const frequencies = [110, 164.81, 220]
      oscillators.current = frequencies.map((frequency, index) => {
        const oscillator = context.createOscillator()
        oscillator.type = index === 2 ? 'sine' : 'triangle'
        oscillator.frequency.value = frequency
        oscillator.detune.value = index * 4
        oscillator.connect(gain)
        oscillator.start()
        return oscillator
      })

      audioContext.current = context
      masterGain.current = gain
    }

    const context = audioContext.current
    const gain = masterGain.current
    if (!context || !gain) return

    if (context.state === 'suspended') void context.resume()
    const nextMuted = !muted
    gain.gain.setTargetAtTime(nextMuted ? 0 : 0.035, context.currentTime, 0.12)
    setMuted(nextMuted)
  }

  return (
    <button className="sound-toggle" type="button" onClick={toggleAudio} aria-label={muted ? 'Enable ambient audio' : 'Mute ambient audio'}>
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
    </button>
  )
}
