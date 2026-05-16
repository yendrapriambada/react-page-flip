import { useCallback, useEffect, useRef, useState } from 'react'
import { cancelSpeech, speakIndonesianMale } from '../utils/tts'

/**
 * Hook untuk sinkronisasi TTS dan animasi teks.
 * - Mengandalkan onboundary event dari TTS untuk reveal teks kata per kata.
 * - Tidak ada interval paralel — animasi sepenuhnya dikontrol oleh TTS engine.
 * - Fallback ke animasi heuristik jika speechSynthesis tidak tersedia.
 * - onend adalah sinyal selesai: teks langsung penuh dan state selesai.
 */
export function useTTSAnimation(fullText) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const fallbackIntervalRef = useRef(null)

  const stopAll = useCallback(() => {
    cancelSpeech()
    if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current)
  }, [])

  const finish = useCallback(() => {
    stopAll()
    setDisplayedText(fullText)
    setIsPlaying(false)
    setIsCompleted(true)
  }, [fullText, stopAll])

  const handlePlay = useCallback(() => {
    if (isPlaying) return
    stopAll()
    setDisplayedText('')
    setIsCompleted(false)
    setIsPlaying(true)

    if (!window.speechSynthesis) {
      // Fallback: animasi heuristik jika TTS tidak tersedia
      let index = 0
      const words = fullText.trim().split(/\s+/).filter(Boolean).length
      const secs = (words * 60) / (130 * 0.9)
      const perChar = Math.max(15, Math.min(80, (secs * 1000) / fullText.length))
      fallbackIntervalRef.current = setInterval(() => {
        index += 1
        setDisplayedText(fullText.slice(0, index))
        if (index >= fullText.length) {
          clearInterval(fallbackIntervalRef.current)
          setIsPlaying(false)
          setIsCompleted(true)
        }
      }, perChar)
      return
    }

    speakIndonesianMale(fullText, {
      rate: 0.9,
      onBoundary: (e) => {
        if (e.charIndex != null) {
          const revealUpTo = Math.min(e.charIndex + (e.charLength ?? 1), fullText.length)
          setDisplayedText(fullText.slice(0, revealUpTo))
        }
      },
      onEnd: finish,
      onError: finish,
    })
  }, [fullText, isPlaying, stopAll, finish])

  useEffect(() => {
    return () => stopAll()
  }, [stopAll])

  // Reset saat teks berubah
  useEffect(() => {
    stopAll()
    setDisplayedText('')
    setIsPlaying(false)
    setIsCompleted(false)
  }, [fullText]) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayedText, isPlaying, isCompleted, handlePlay }
}
