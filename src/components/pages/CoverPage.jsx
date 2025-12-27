import { forwardRef } from 'react'

const CoverPage = forwardRef(function CoverPage(props, ref) {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-cover-content">
        <div className="cover-board">
          <div className="cover-bunting">
            <span className="cover-flag cover-flag-1" />
            <span className="cover-flag cover-flag-2" />
            <span className="cover-flag cover-flag-3" />
            <span className="cover-flag cover-flag-4" />
            <span className="cover-flag cover-flag-5" />
          </div>
          <div className="cover-board-inner">
            <h2 className="cover-title">
              Environmentally Friendly Technology for Irrigation
            </h2>
            <div className="cover-image-wrapper">
              <div className="cover-image-frame">
                <img
                  src="https://images.pexels.com/photos/1000052/pexels-photo-1000052.jpeg"
                  alt="Petani memeriksa lahan irigasi yang ramah lingkungan"
                  className="cover-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CoverPage

