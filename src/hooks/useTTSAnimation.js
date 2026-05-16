import { useCallback, useEffect, useRef, useState } from 'react'
import { cancelSpeech, speakIndonesianMale } from '../utils/tts'

/**
 * Hook untuk sinkronisasi TTS dan animasi teks karakter per karakter.
 * - Kecepatan animasi dihitung dari estimasi WPM agar mendekati kecepatan TTS.
 * - onboundary menyinkronkan posisi karakter saat TTS melompat ke kata baru.
 * - onend adalah sinyal selesai yang otoritatif: teks langsung penuh dan state selesai.
 * Dengan begitu TTS dan animasi selalu berakhir bersamaan.
 */
export function useTTSAnimation(fullText) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const intervalRef = useRef(null)
  const charIndexRef = useRef(0)

  const finish = useCallback(() => {
    clearInterval(intervalRef.current)
    setDisplayedText(fullText)
    setIsPlaying(false)
    setIsCompleted(true)
  }, [fullText])

  const handlePlay = useCallback(() => {
    if (isPlaying) return
    clearInterval(intervalRef.current)
    charIndexRef.current = 0
    setDisplayedText('')
    setIsCompleted(false)
    setIsPlaying(true)

    // Estimasi durasi dari WPM (170 kata/menit pada rate 0.95)
    const words = fullText.trim().split(/\s+/).filter(Boolean).length
    const estimatedMs = (words / (170 * 0.95)) * 60_000
    const perCharMs = Math.max(15, estimatedMs / fullText.length)

    intervalRef.current = setInterval(() => {
      charIndexRef.current = Math.min(charIndexRef.current + 1, fullText.length)
      setDisplayedText(fullText.slice(0, charIndexRef.current))
      if (charIndexRef.current >= fullText.length) {
        clearInterval(intervalRef.current)
        // Jangan panggil finish() di sini — tunggu onEnd dari TTS
      }
    }, perCharMs)

    speakIndonesianMale(fullText, {
      onBoundary: (e) => {
        if (e.name !== 'word' || typeof e.charIndex !== 'number') return
        // Hanya maju, jangan pernah mundur — cegah animasi loncat balik
        // saat TTS pertama fire boundary di awal kata.
        const target = e.charIndex + (e.charLength || 0)
        if (target > charIndexRef.current) {
          charIndexRef.current = target
          setDisplayedText(fullText.slice(0, target))
        }
      },
      onEnd: finish,
      onError: finish,
    })
  }, [fullText, isPlaying, finish])

  useEffect(() => {
    return () => {
      cancelSpeech()
      clearInterval(intervalRef.current)
    }
  }, [])

  return { displayedText, isPlaying, isCompleted, handlePlay }
}
