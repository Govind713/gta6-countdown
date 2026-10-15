import { ArrowUpRight, Bell, BellOff, CalendarDays, Clock3, Disc3, Download, Gamepad2, Library } from 'lucide-react'
import { AudioPlayer } from './components/AudioPlayer'
import { BackgroundFx } from './components/BackgroundFx'
import { CountdownCard } from './components/CountdownCard'
import { ShareActions } from './components/ShareActions'
import { IntelPanel } from './components/IntelPanel'
import { useCountdown } from './hooks/useCountdown'
import { useNotifications } from './hooks/useNotifications'
import { useState } from 'react'

function App() {
  const [intelOpen, setIntelOpen] = useState(false)
  const { days, hours, minutes, seconds, isLaunched } = useCountdown()
  const preload = useCountdown(new Date('2026-11-17T00:00:00+05:30').getTime())
  const { enabled, permission, supported, enableNotifications, disableNotifications } = useNotifications()
  const countdown = [
    { label: 'DAYS', value: days, icon: <CalendarDays size={18} /> },
    { label: 'HOURS', value: hours, icon: <Clock3 size={18} /> },
    { label: 'MINS', value: minutes, icon: <Disc3 size={18} /> },
    { label: 'SECS', value: seconds, icon: <Gamepad2 size={18} /> },
  ]

  return (
    <main className="app-shell">
      <BackgroundFx />
      <div className="content-wrap">
        <header className="site-header">
          <a className="wordmark" href="/" aria-label="Grand Theft Auto VI home">
            <span className="wordmark-small">GRAND THEFT AUTO</span>
            <span className="wordmark-vi">VI</span>
          </a>
          <AudioPlayer />
          {supported && permission !== 'denied' && (
            <button
              className="notification-toggle"
              type="button"
              onClick={enabled ? disableNotifications : enableNotifications}
              aria-label={enabled ? 'Disable launch notifications' : 'Enable launch notifications'}
              title={enabled ? 'Disable launch notifications' : 'Enable launch notifications'}
            >
              {enabled ? <Bell size={16} /> : <BellOff size={16} />}
              <span>{enabled ? 'ALERTS ON' : 'GET ALERTS'}</span>
            </button>
          )}
        </header>

        <section className="hero-section">
          <p className="eyebrow"><span /> ROCKSTAR GAMES PRESENTS</p>
          <h1>THE WAIT<br /><em>IS ALMOST OVER.</em></h1>
          <p className="subtitle">WELCOME BACK TO LEONIDA</p>
          <div className="target-pill"><CalendarDays size={14} /> TARGET: 19 NOV 2026 <b>•</b> 00:00 IST (INDIA)</div>
        </section>

        <section className="countdown-section" aria-label="Countdown to launch">
          <div className="section-heading"><span>LAUNCH COUNTDOWN</span><span className="live-dot">● LIVE TRACKING</span></div>
          <div className="countdown-grid">
            {countdown.map((item, index) => <CountdownCard key={item.label} {...item} index={index} />)}
          </div>
          <p className="launch-state">{isLaunched ? 'WELCOME TO LEONIDA' : 'TIME UNTIL WE RIDE INTO THE SUNSET'}</p>
          <aside className="preload-panel" aria-label="Estimated India preload countdown">
            <span className="preload-icon"><Download size={17} /></span>
            <div className="preload-copy">
              <span className="preload-title">INDIA PRELOAD <b>ESTIMATED</b></span>
              <span className="preload-date">17 NOV 2026 · 00:00 IST</span>
            </div>
            <div className="preload-time" aria-label={`${preload.days} days, ${preload.hours} hours, ${preload.minutes} minutes and ${preload.seconds} seconds`}>
              <span><strong>{String(preload.days).padStart(2, '0')}</strong><small>D</small></span>
              <i>:</i>
              <span><strong>{String(preload.hours).padStart(2, '0')}</strong><small>H</small></span>
              <i>:</i>
              <span><strong>{String(preload.minutes).padStart(2, '0')}</strong><small>M</small></span>
              <i>:</i>
              <span><strong>{String(preload.seconds).padStart(2, '0')}</strong><small>S</small></span>
            </div>
          </aside>
          <ShareActions days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </section>

        <a className="trailer-button" href="https://www.rockstargames.com/VI" target="_blank" rel="noreferrer">
          <span className="play-mark">▶</span><span>WATCH THE TRAILER</span><ArrowUpRight size={18} />
        </a>

        <footer className="site-footer">
          <span>FAN-MADE COUNTDOWN • NOT AFFILIATED WITH ROCKSTAR GAMES</span>
          <span className="platforms"><b>PS5</b><i /> <b>XBOX SERIES X|S</b></span>
          <button className="intel-trigger mobile-intel-trigger" type="button" onClick={() => setIntelOpen(true)}>
            <Library size={17} /> <span>EXPLORE LEONIDA</span>
          </button>
        </footer>
      </div>
      <button className="intel-trigger desktop-intel-trigger" type="button" onClick={() => setIntelOpen(true)}>
        <Library size={17} /> <span>EXPLORE LEONIDA</span>
      </button>
      {intelOpen && <IntelPanel onClose={() => setIntelOpen(false)} />}
    </main>
  )
}

export default App
