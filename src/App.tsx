import { ArrowUpRight, CalendarDays, Clock3, Disc3, Gamepad2 } from 'lucide-react'
import { AudioPlayer } from './components/AudioPlayer'
import { BackgroundFx } from './components/BackgroundFx'
import { CountdownCard } from './components/CountdownCard'
import { useCountdown } from './hooks/useCountdown'

function App() {
  const { days, hours, minutes, seconds, isLaunched } = useCountdown()
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
        </section>

        <a className="trailer-button" href="https://www.rockstargames.com/VI" target="_blank" rel="noreferrer">
          <span className="play-mark">▶</span><span>WATCH THE TRAILER</span><ArrowUpRight size={18} />
        </a>

        <footer className="site-footer">
          <span>FAN-MADE COUNTDOWN • NOT AFFILIATED WITH ROCKSTAR GAMES</span>
          <span className="platforms"><b>PS5</b><i /> <b>XBOX SERIES X|S</b></span>
        </footer>
      </div>
    </main>
  )
}

export default App
