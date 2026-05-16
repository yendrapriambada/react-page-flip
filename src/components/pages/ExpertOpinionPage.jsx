import { forwardRef, useState, useRef, useEffect } from 'react'
import { speakIndonesianMale, cancelSpeech } from '../../utils/tts'

const ExpertOpinionPage = forwardRef((props, ref) => {
  const [playingIndex, setPlayingIndex] = useState(null)
  const [displayedText, setDisplayedText] = useState('')
  const [revealed, setRevealed] = useState([])
  const intervalRef = useRef(null)

  const experts = [
    {
      name: 'Prof. Patel',
      title: 'Ahli Teknologi Lingkungan',
      quote:
        'Penggunaan teknologi pompa air tenaga surya dapat menjadi solusi yang berkelanjutan untuk mengatasi kekurangan air dalam irigasi pertanian, terutama di wilayah dengan paparan sinar matahari yang cukup tinggi.',
      img: 'https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Dr. Lopez',
      title: 'Ahli Hidrologi',
      quote:
        'Pembangunan bendungan besar dapat membantu dalam mengatasi masalah kekurangan air dengan mengumpulkan dan menyimpan air hujan.',
      img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Prof. Wang',
      title: 'Ahli Sumber Daya Air',
      quote:
        'Sistem irigasi permukaan tradisional seringkali efektif dalam menyediakan air bagi lahan pertanian, terutama di daerah dengan akses yang mudah ke sumber air seperti sungai atau danau.',
      img: 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Dr. Tanaka',
      title: 'Ahli Pertanian',
      quote:
        'Penggunaan Sistem Intensifikasi Beras (SRI), sistem ini dapat meningkatkan keseimbangan ekologi tanah. Tanaman padi SRI ditanam dengan jarak yang lebih lebar dan kedalaman yang lebih dangkal.',
      img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ]

  const handlePlayClick = (e, index) => {
    e.stopPropagation()
    e.preventDefault()

    cancelSpeech()
    clearInterval(intervalRef.current)

    if (playingIndex === index) {
      setPlayingIndex(null)
      setDisplayedText('')
      return
    }

    const text = experts[index].quote
    setPlayingIndex(index)
    setDisplayedText('')

    const words = text.trim().split(/\s+/).filter(Boolean).length
    const estimatedMs = (words / (170 * 0.95)) * 60_000
    const perCharMs = Math.max(15, estimatedMs / text.length)
    let charIdx = 0

    intervalRef.current = setInterval(() => {
      charIdx = Math.min(charIdx + 1, text.length)
      setDisplayedText(text.slice(0, charIdx))
      if (charIdx >= text.length) clearInterval(intervalRef.current)
    }, perCharMs)

    const finish = () => {
      clearInterval(intervalRef.current)
      setDisplayedText(text)
      setPlayingIndex(null)
      setRevealed((prev) => (prev.includes(index) ? prev : [...prev, index]))
    }

    speakIndonesianMale(text, {
      onBoundary: (e) => {
        if (e.name === 'word' && typeof e.charIndex === 'number') {
          charIdx = e.charIndex
          setDisplayedText(text.slice(0, e.charIndex))
        }
      },
      onEnd: finish,
      onError: finish,
    })
  }

  useEffect(() => {
    return () => {
      cancelSpeech()
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="page" ref={ref}>
      <div className="page-content expert-opinion-page">
        <div className="expert-intro-box">
          <p>
            Setelah membaca teks pemberitahuan tersebut, seorang mahasiswa Prodi Pendidikan IPA
            berusaha membantu mencarikan solusi dari permasalahan yang ada pada pemberitahuan
            tersebut. Beberapa rencana solusi yang mungkin dilakukan setelah membaca beberapa
            artikel dari empat orang pakar di bidangnya sebagai berikut:
          </p>
        </div>

        <div className="expert-list">
          {experts.map((expert, index) => (
            <div key={index} className="expert-card">
              <div className="expert-img-wrapper">
                <img src={expert.img} alt={expert.title} className="expert-img" />
              </div>
              <div className="expert-content">
                <h3 className="expert-name">{expert.title}</h3>
                <p className="expert-quote">
                  {revealed.includes(index) ? (
                    `"${expert.quote}"`
                  ) : playingIndex === index ? (
                    `"${displayedText}"`
                  ) : (
                    <span className="expert-placeholder">
                      Klik tombol play untuk mendengarkan pendapat ahli ▶
                    </span>
                  )}
                </p>
              </div>
              <button
                className={`expert-play-btn ${playingIndex === index ? 'playing' : ''}`}
                onClick={(e) => handlePlayClick(e, index)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                disabled={playingIndex !== null && playingIndex !== index}
                title={playingIndex === index ? 'Stop' : 'Dengarkan'}
              >
                {playingIndex === index ? '⏹' : '▶'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default ExpertOpinionPage
