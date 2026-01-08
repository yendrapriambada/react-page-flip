export const cancelSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

const loadAzureSDK = () => {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.SpeechSDK) return Promise.resolve(window.SpeechSDK)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://aka.ms/csspeech/jsbrowserpackageraw'
    script.async = true
    script.onload = () => resolve(window.SpeechSDK || null)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const ensureVoices = (cb) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const list = window.speechSynthesis.getVoices()
  if (list && list.length) {
    cb(list)
    return
  }
  const once = () => {
    window.speechSynthesis.removeEventListener('voiceschanged', once)
    cb(window.speechSynthesis.getVoices())
  }
  window.speechSynthesis.addEventListener('voiceschanged', once)
  window.speechSynthesis.getVoices()
}

const pickIndonesianVoice = (voices, gender) => {
  const isIndo = (v) => {
    const lang = (v.lang || '').toLowerCase()
    const name = (v.name || '').toLowerCase()
    return lang.startsWith('id') || /bahasa indonesia|indonesian|indonesia/.test(name)
  }
  const vendor = (v) => (v.name || '').toLowerCase().match(/microsoft|google/)?.[0] || ''
  const candidates = voices.filter(isIndo)
  if (!candidates.length) return null
  const maleNames = [/andika/, /male/, /laki/, /pria/]
  const femaleNames = [/dita/, /female/, /wanita/, /perempuan/]
  const nameMatch = (v, patterns) => patterns.some((p) => p.test((v.name || '').toLowerCase()))
  const byVendor = (list, pref) => list.find((v) => vendor(v) === pref) || list[0]
  if (gender === 'male') {
    const maleCandidates = candidates.filter((v) => nameMatch(v, maleNames))
    if (maleCandidates.length) return byVendor(maleCandidates, 'microsoft') || byVendor(maleCandidates, 'google')
    return byVendor(candidates, 'microsoft') || byVendor(candidates, 'google')
  }
  if (gender === 'female') {
    const femaleCandidates = candidates.filter((v) => nameMatch(v, femaleNames))
    if (femaleCandidates.length) return byVendor(femaleCandidates, 'microsoft') || byVendor(femaleCandidates, 'google')
    return byVendor(candidates, 'microsoft') || byVendor(candidates, 'google')
  }
  return byVendor(candidates, 'microsoft') || byVendor(candidates, 'google')
}

export const speakIndonesian = (text, opts = {}) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const useAzure =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_AZURE_SPEECH_KEY &&
    import.meta.env.VITE_AZURE_SPEECH_REGION
  if (useAzure) {
    loadAzureSDK()
      .then((SDK) => {
        if (!SDK) return
        const speechConfig = SDK.SpeechConfig.fromSubscription(
          import.meta.env.VITE_AZURE_SPEECH_KEY,
          import.meta.env.VITE_AZURE_SPEECH_REGION
        )
        speechConfig.speechSynthesisLanguage = 'id-ID'
        const gender = opts.gender || 'male'
        const voiceName = gender === 'male' ? 'id-ID-ArdiNeural' : 'id-ID-GadisNeural'
        speechConfig.speechSynthesisVoiceName = voiceName
        const audioConfig = SDK.AudioConfig.fromDefaultSpeakerOutput()
        const synthesizer = new SDK.SpeechSynthesizer(speechConfig, audioConfig)
        synthesizer.speakTextAsync(
          String(text),
          () => {
            synthesizer.close()
          },
          (err) => {
            synthesizer.close()
          }
        )
      })
      .catch(() => {})
    return null
  }
  cancelSpeech()
  const rate = typeof opts.rate === 'number' ? opts.rate : 0.95
  const pitch = typeof opts.pitch === 'number' ? opts.pitch : 1
  const gender = opts.gender || 'male'
  const utter = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, ' ').trim())
  utter.lang = 'id-ID'
  utter.rate = rate
  utter.pitch = pitch
  ensureVoices((voices) => {
    const voice = pickIndonesianVoice(voices, gender)
    if (voice) utter.voice = voice
    window.speechSynthesis.speak(utter)
  })
  return utter
}

export const speakIndonesianMale = (text, opts = {}) => {
  return speakIndonesian(text, { ...opts, gender: 'male' })
}
