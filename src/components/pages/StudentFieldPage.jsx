import { forwardRef, useEffect, useRef, useState } from 'react'
import studentImage from '../../assets/mahasiswapenelitian.png'

const StudentFieldPage = forwardRef(function StudentFieldPage(props, ref) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [displayedText, setDisplayedText] = useState('Klik play untuk memutar teks...')
  const [voices, setVoices] = useState([])
  const utteranceRef = useRef(null)
  const [manualIntervalMs, setManualIntervalMs] = useState(null)

  const fullText =
    'Pada mata kuliah Pendidikan IPA Terpadu, mahasiswa diminta untuk mengerjakan tugas dengan tema Teknologi Ramah Lingkungan untuk Irigasi.\n\n' +
    'Setelah disepakati bersama, konteks yang akan dibahas terkait tema tersebut adalah Sistem Irigasi Pertanian.\n\n' +
    'Secara spesifik akan membahas tentang bagaimana kondisi sistem irigasi di lingkungan Kota X dalam mengatasi ketersediaan air yang semakin terbatas.'

  const HIGHLIGHTS = [
    'Pendidikan IPA Terpadu',
    'Teknologi Ramah Lingkungan untuk Irigasi',
    'Sistem Irigasi Pertanian',
  ]

  const renderWithHighlights = text => {
    const parts = []
    let rest = text
    let k = 0
    while (rest.length) {
      let foundIndex = -1
      let foundPhrase = null
      for (const phrase of HIGHLIGHTS) {
        const i = rest.indexOf(phrase)
        if (i !== -1 && (foundIndex === -1 || i < foundIndex)) {
          foundIndex = i
          foundPhrase = phrase
        }
      }
      if (foundIndex === -1) {
        parts.push(rest)
        break
      }
      if (foundIndex > 0) {
        parts.push(rest.slice(0, foundIndex))
      }
      parts.push(
        <strong key={`hl-${k++}`} style={{ fontWeight: 700 }}>
          {foundPhrase}
        </strong>
      )
      rest = rest.slice(foundIndex + foundPhrase.length)
    }
    return parts
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }
    const updateVoices = () => {
      const list = window.speechSynthesis.getVoices()
      setVoices(list)
    }
    updateVoices()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
    }
  }, [])

  const pickVoice = () => {
    const isIndo = v =>
      v.lang?.toLowerCase().startsWith('id') ||
      /bahasa indonesia|indonesian|indonesia/i.test(v.name || '')
    const vendor = v => (v.name || '').toLowerCase().match(/microsoft|google/)?.[0] || ''
    const maleNames = [/andika/, /male/, /laki/, /pria/]
    const nameMatch = v => maleNames.some(p => p.test((v.name || '').toLowerCase()))
    const candidates = voices.filter(isIndo)
    const maleCandidates = candidates.filter(nameMatch)
    if (maleCandidates.length) return maleCandidates.find(v => vendor(v) === 'microsoft') || maleCandidates[0]
    return candidates.find(v => vendor(v) === 'microsoft') || candidates.find(v => vendor(v) === 'google') || candidates[0] || null
  }

  const startSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }
    if (!voices || voices.length === 0) {
      const once = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', once)
        startSpeech()
      }
      window.speechSynthesis.addEventListener('voiceschanged', once)
      window.speechSynthesis.getVoices()
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(fullText.replace(/\n\n/g, '\n'))
    utter.lang = 'id-ID'
    const voice = pickVoice()
    if (voice) utter.voice = voice
    utter.rate = 0.9
    utter.pitch = 1
    const words = fullText.replace(/\n/g, ' ').trim().split(/\s+/).filter(Boolean).length
    const baseWpm = 170
    const expectedMs = (words / (baseWpm * utter.rate)) * 60000
    const perCharMs = expectedMs / fullText.length
    setManualIntervalMs(perCharMs)

    utter.onboundary = e => {
      if (typeof e.charIndex === 'number') {
        setDisplayedText(fullText.slice(0, e.charIndex))
      }
      setManualIntervalMs(null)
    }
    utter.onend = () => {
      setIsFinished(true)
      setIsPlaying(false)
      setManualIntervalMs(null)
    }
    utter.onerror = () => {
      setManualIntervalMs(null)
    }
    utteranceRef.current = utter
    window.speechSynthesis.speak(utter)
  }

  const handlePlayClick = () => {
    if (!isPlaying) {
      setDisplayedText('')
      setIsPlaying(true)
      setIsFinished(false)
      startSpeech()
    }
  }

  useEffect(() => {
    if (!isPlaying || manualIntervalMs == null) {
      return
    }
    let index = displayedText.length
    const intervalId = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(intervalId)
        // Tunggu onend dari speech untuk menandai selesai
      }
    }, manualIntervalMs)
    return () => {
      clearInterval(intervalId)
    }
  }, [isPlaying, manualIntervalMs, fullText, displayedText])

  return (
    <div className="page" ref={ref}>
      <div className="page-content student-field-page">
        <div className="student-board">
          <div className="student-board-inner">
            <div className="cover-bunting student-board-bunting">
              <span className="cover-flag cover-flag-1" />
              <span className="cover-flag cover-flag-2" />
              <span className="cover-flag cover-flag-3" />
              <span className="cover-flag cover-flag-4" />
              <span className="cover-flag cover-flag-5" />
            </div>

            <div className="student-board-body">
              <div className="student-image-wrapper">
                <img
                  src={studentImage}
                  alt="Mahasiswa belajar bersama di area persawahan"
                  className="student-image"
                />
              </div>

              <div
                className={`student-text-wrapper ${
                  isPlaying ? 'student-text-animate' : ''
                }`}
                style={isFinished ? { maxHeight: 'none', flex: 1 } : {}}
              >
                <div className="student-text-inner">
                  {displayedText.split('\n\n').map((block, idx) => (
                    <p key={idx}>{renderWithHighlights(block)}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isFinished && (
          <button
            type="button"
            className={`student-play-button ${
              isPlaying ? 'student-play-button-active' : ''
            }`}
            onClick={handlePlayClick}
            disabled={isPlaying}
          >
            {isPlaying ? 'Listening...' : '▶ Play'}
          </button>
        )}
      </div>
    </div>
  )
})

export default StudentFieldPage
