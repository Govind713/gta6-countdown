import { Car, Clapperboard, Compass, FileText, Image, Map, Newspaper, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type IntelTab = 'trailers' | 'screenshots' | 'characters' | 'locations' | 'news' | 'vehicles'

interface IntelItem {
  title: string
  eyebrow: string
  description: string
  meta: string
  art: string
  imageUrl?: string
  href?: string
}

const officialArtwork = 'https://www.rockstargames.com/VI/-/opengraph-image.jpg?opengraph-image.0t8ty~nlmxq2s.jpg'

const tabs: { id: IntelTab; label: string; icon: typeof Clapperboard }[] = [
  { id: 'trailers', label: 'TRAILERS', icon: Clapperboard },
  { id: 'screenshots', label: 'SCREENSHOTS', icon: Image },
  { id: 'characters', label: 'CHARACTERS', icon: FileText },
  { id: 'locations', label: 'LOCATIONS', icon: Map },
  { id: 'news', label: 'NEWS', icon: Newspaper },
  { id: 'vehicles', label: 'VEHICLES', icon: Car },
]

const intel: Record<IntelTab, IntelItem[]> = {
  trailers: [
    { title: 'Trailer 1', eyebrow: 'OFFICIAL REVEAL', description: 'The first look at Jason, Lucia, and the neon sprawl of Leonida.', meta: 'DEC 2023', art: 'art-sunset', imageUrl: officialArtwork, href: 'https://www.youtube.com/watch?v=QdBZY2fkU-0' },
    { title: 'Trailer 2', eyebrow: 'OFFICIAL TRAILER', description: 'A closer look at the duo, their crew, and life on the run.', meta: 'MAY 2025', art: 'art-neon', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Rockstar Newswire', eyebrow: 'OFFICIAL SOURCE', description: 'Follow the official source for future videos and announcements.', meta: 'ROCKSTAR GAMES', art: 'art-wire', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/newswire' },
  ],
  screenshots: [
    { title: 'Vice City nights', eyebrow: 'VISUAL ARCHIVE', description: 'Neon streets, late-night rides, and a city that never clocks out.', meta: 'GALLERY 01', art: 'art-night', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Leonida coast', eyebrow: 'VISUAL ARCHIVE', description: 'Sun, water, and wide-open roads beyond the city limits.', meta: 'GALLERY 02', art: 'art-coast', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'On the road', eyebrow: 'VISUAL ARCHIVE', description: 'The highways connect a diverse state built for getting lost.', meta: 'GALLERY 03', art: 'art-road', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
  ],
  characters: [
    { title: 'Lucia', eyebrow: 'PLAYABLE PROTAGONIST', description: 'Sharp, determined, and ready to make her own way through Leonida.', meta: 'JASON + LUCIA', art: 'art-lucia', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Jason', eyebrow: 'PLAYABLE PROTAGONIST', description: 'A life of risk, fast cars, and an alliance that changes everything.', meta: 'JASON + LUCIA', art: 'art-jason', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'The crew', eyebrow: 'LEONIDA CONNECTIONS', description: 'A wider cast surrounds the pair as their story moves across the state.', meta: 'SUPPORTING CAST', art: 'art-crew', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
  ],
  locations: [
    { title: 'Vice City', eyebrow: 'URBAN CORE', description: 'A modern neon metropolis packed with nightlife, traffic, and opportunity.', meta: 'LEONIDA / EAST', art: 'art-city', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Leonida Keys', eyebrow: 'ISLANDS + COAST', description: 'Warm water, small communities, and a slower rhythm beyond the city.', meta: 'LEONIDA / SOUTH', art: 'art-keys', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'The wider state', eyebrow: 'OPEN COUNTRY', description: 'Marshes, highways, towns, and hidden corners stretch beyond Vice City.', meta: 'LEONIDA / NORTH', art: 'art-marsh', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
  ],
  news: [
    { title: 'GTA VI announced', eyebrow: 'MILESTONE', description: 'Rockstar Games confirms the next chapter of Grand Theft Auto.', meta: 'FEB 2022', art: 'art-news', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/newswire' },
    { title: 'First trailer arrives', eyebrow: 'MILESTONE', description: 'The world meets Jason, Lucia, and the state of Leonida.', meta: 'DEC 2023', art: 'art-sunset', imageUrl: officialArtwork, href: 'https://www.youtube.com/watch?v=QdBZY2fkU-0' },
    { title: 'Launch date confirmed', eyebrow: 'MILESTONE', description: 'GTA VI is scheduled to launch on 19 November 2026.', meta: 'MAY 2025', art: 'art-date', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/newswire' },
  ],
  vehicles: [
    { title: 'Street machines', eyebrow: 'AUTOMOTIVE', description: 'Fast cars and custom rides belong as much to Leonida as its beaches.', meta: 'CARS + BIKES', art: 'art-car', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Watercraft', eyebrow: 'COASTAL TRAVEL', description: 'The coast and islands open up new ways to move through the world.', meta: 'BOATS + JETS', art: 'art-boat', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
    { title: 'Working fleet', eyebrow: 'LEONIDA TRANSIT', description: 'Emergency, utility, and everyday vehicles fill out the living state.', meta: 'CITY + COUNTRY', art: 'art-fleet', imageUrl: officialArtwork, href: 'https://www.rockstargames.com/VI' },
  ],
}

interface IntelPanelProps {
  onClose: () => void
}

export function IntelPanel({ onClose }: IntelPanelProps) {
  const [activeTab, setActiveTab] = useState<IntelTab>('trailers')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="intel-overlay" role="dialog" aria-modal="true" aria-labelledby="intel-title">
      <button className="intel-backdrop" type="button" aria-label="Close Leonida Intel" onClick={onClose} />
      <section className="intel-panel">
        <header className="intel-header">
          <div>
            <p className="intel-kicker"><span /> LEONIDA INTEL</p>
            <h2 id="intel-title">THE WORLD<br /><em>IS WAITING.</em></h2>
          </div>
          <button className="intel-close" type="button" onClick={onClose} aria-label="Close Leonida Intel" title="Close">
            <X size={20} />
          </button>
        </header>

        <nav className="intel-tabs" aria-label="Leonida Intel categories">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} className={activeTab === id ? 'active' : ''} type="button" onClick={() => setActiveTab(id)} aria-selected={activeTab === id} role="tab">
              <Icon size={15} /> <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="intel-grid" role="tabpanel">
          {intel[activeTab].map((item) => (
            <article className="intel-card" key={item.title}>
              <div className={`intel-art ${item.art}`} aria-hidden="true">
                {item.imageUrl && <img src={item.imageUrl} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} />}
                <Compass size={28} />
              </div>
              <div className="intel-card-copy">
                <p className="intel-card-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="intel-card-meta"><span>{item.meta}</span>{item.href && <a href={item.href} target="_blank" rel="noreferrer">OPEN SOURCE ↗</a>}</div>
              </div>
            </article>
          ))}
        </div>

        <p className="intel-note">FAN-MADE INDEX • OFFICIAL LINKS ARE PROVIDED FOR REFERENCE</p>
      </section>
    </div>
  )
}