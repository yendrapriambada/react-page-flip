import { forwardRef } from 'react'
import { useAnswers } from '../../context/AnswersContext'
import pompahidram from '../../assets/pompahidram.png';
import pompasubmersible from '../../assets/pompasubmersible.png';
import pompadiesel from '../../assets/pompadiesel.png';

const SolutionEvaluationPage = forwardRef(function SolutionEvaluationPage(props, ref) {
  const { answers, setQ2Choice, setQ2Reason } = useAnswers()

  const handleChoice = (val) => {
    setQ2Choice(val)
  }

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content solution-evaluation-page">
        <div className="evaluation-container">
            {/* Top Section */}
            <div className="evaluation-top">
              <p className="evaluation-intro">
                Salah satu mahasiswa menyajikan tiga solusi yang dapat digunakan untuk
                menyelesaikan persoalan pada wacana sebelumnya. Ketiga solusi tersebut
                menggunakan pompa seperti gambar yang disajikan di bawah ini.
              </p>
              <div className="pump-gallery">
                <div className="pump-card">
                  <img
                    src={pompahidram}
                    alt="Pompa Hidram"
                  />
                  <span>Pompa Hidram</span>
                </div>
                <div className="pump-card">
                  <img
                    src={pompasubmersible}
                    alt="Pompa Submersible"
                  />
                  <span>Pompa Submersible</span>
                </div>
                <div className="pump-card">
                  <img
                    src={pompadiesel}
                    alt="Pompa Diesel"
                  />
                  <span>Pompa Diesel</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="evaluation-bottom">
              <div className="evaluation-question-card">
                <h3 className="evaluation-question">
                  Menurut pendapatmu, apakah ketiga solusi yang dikemukakan mahasiswa
                  tersebut dapat menyelesaikan persoalan pada wacana di atas? mengapa?
                </h3>
                <div className="evaluation-choices">
                  <button
                    type="button"
                    className={`evaluation-btn ${answers.q2.choice === true ? 'evaluation-btn-yes' : ''}`}
                    onClick={() => handleChoice(true)}
                  >
                    Ya
                  </button>
                  <button
                    type="button"
                    className={`evaluation-btn ${answers.q2.choice === false ? 'evaluation-btn-no' : ''}`}
                    onClick={() => handleChoice(false)}
                  >
                    Tidak
                  </button>
                </div>
                <div className="evaluation-input-wrapper">
                  <label>Tuliskan alasanmu pada kolom di bawah ini</label>
                  <textarea
                    placeholder="Jawaban Anda..."
                    value={answers.q2.reason}
                    onChange={(e) => setQ2Reason(e.target.value)}
                    onPointerDownCapture={stopFlipPropagation}
                    onMouseDownCapture={stopFlipPropagation}
                    onTouchStartCapture={stopFlipPropagation}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
});

SolutionEvaluationPage.displayName = 'SolutionEvaluationPage'

export default SolutionEvaluationPage
