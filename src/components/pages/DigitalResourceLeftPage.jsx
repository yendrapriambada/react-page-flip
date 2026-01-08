import { forwardRef, useEffect, useState } from 'react'
import googlebooksIcon from '../../assets/googlebooks.png'
import springerIcon from '../../assets/springer.png'
import pubmedIcon from '../../assets/pubmed.jpg'
import sciencedirectIcon from '../../assets/sciencedirect.png'
import doaj from '../../assets/doaj.jpg'
import wiley from '../../assets/wiley-online.png'
import { speakIndonesianMale, cancelSpeech } from '../../utils/tts'

const SITES = [
  {
    name: 'ScienceDirect',
    href: 'https://www.sciencedirect.com/',
    img: sciencedirectIcon,
  },
  {
    name: 'PubMed',
    href: 'https://pubmed.ncbi.nlm.nih.gov/',
    img: pubmedIcon,
  },
  {
    name: 'Springer',
    href: 'https://link.springer.com/',
    img: springerIcon,
  },
  {
    name: 'IEEE Xplore',
    href: 'https://ieeexplore.ieee.org/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ieee.svg',
  },
  {
    name: 'Wiley Online Library',
    href: 'https://onlinelibrary.wiley.com/',
    img: wiley,
  },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlescholar.svg',
  },
  {
    name: 'DOAJ',
    href: 'https://doaj.org/',
    img: doaj,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg',
  },
  {
    name: 'Coursera',
    href: 'https://www.coursera.org/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/coursera.svg',
  },
  {
    name: 'TED Talks',
    href: 'https://www.ted.com/talks',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ted.svg',
  },
  {
    name: 'Open Library',
    href: 'https://openlibrary.org/',
    img: 'https://openlibrary.org/static/images/openlibrary-logo-tighter.svg',
  },
  {
    name: 'Amazon Kindle',
    href: 'https://www.amazon.com/Kindle-eBooks/b?ie=UTF8&node=154606011',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg',
  },
  {
    name: 'Google Books',
    href: 'https://books.google.com/',
    img: googlebooksIcon,
  },
]

const DigitalResourceLeftPage = forwardRef(function DigitalResourceLeftPage(props, ref) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const fullText =
    'Carilah informasi dari penyedia sumber daya digital (artikel, video, e-book) di internet tentang teknologi irigasi modern.\n\n' +
    'Berikut ini beberapa situs penyedia sumber daya digital yang bisa anda pilih dan gunakan.'
  const [displayedText, setDisplayedText] = useState('')
  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }
  const preventDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handlePlayClick = () => {
    if (!isPlaying) {
      setDisplayedText('')
      setIsCompleted(false)
      setIsPlaying(true)
      speakIndonesianMale(fullText)
    }
  }

  useEffect(() => {
    if (!isPlaying) return
    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(intervalId)
        setIsPlaying(false)
        setIsCompleted(true)
      }
    }, 30)
    return () => clearInterval(intervalId)
  }, [isPlaying, fullText])

  useEffect(() => {
    return () => cancelSpeech()
  }, [])

  return (
    <div className="page" ref={ref}>
      <div className="page-content digital-left">
        <div className="left-top">
          <img
            className="left-hero"
            src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
            alt="Ilustrasi mencari informasi sumber daya digital"
          />
          <div className="left-callout">
            <p>{displayedText || 'Klik ▶ Play untuk memutar teks'}</p>
          </div>
          {!isCompleted && (
            <button
              type="button"
              className={`student-play-button ${isPlaying ? 'student-play-button-active' : ''}`}
              onClick={handlePlayClick}
              disabled={isPlaying}
            >
              {isPlaying ? 'Listening...' : '▶ Play'}
            </button>
          )}
          <div className="character-section">
            <div className="avatar-ring">
              <div className="avatar-ring-inner">
                <img
                  src="https://images.pexels.com/photos/8617727/pexels-photo-8617727.jpeg"
                  alt="Karakter Dosen"
                  className="character-avatar"
                />
              </div>
            </div>
            <div className="character-info">
              <h3 className="character-name">Bapak Hamka</h3>
              <p className="character-role">Dosen</p>
            </div>
          </div>
        </div>

        <div
          className="site-grid"
          onPointerDownCapture={stopFlipPropagation}
          onPointerUpCapture={stopFlipPropagation}
          onClickCapture={stopFlipPropagation}
          onTouchStartCapture={stopFlipPropagation}
          onTouchEndCapture={stopFlipPropagation}
          onMouseDownCapture={stopFlipPropagation}
          onMouseUpCapture={stopFlipPropagation}
        >
          {SITES.map((s) => (
            <a
              key={s.name}
              className="site-card"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onPointerUpCapture={stopFlipPropagation}
              onMouseUpCapture={stopFlipPropagation}
              onTouchEndCapture={stopFlipPropagation}
              onClickCapture={stopFlipPropagation}
              onDragStart={preventDrag}
            >
              <img src={s.img} alt={s.name} className="site-logo" draggable={false} onDragStart={preventDrag} />
              <span className="site-label">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})

DigitalResourceLeftPage.displayName = 'DigitalResourceLeftPage'

export default DigitalResourceLeftPage
