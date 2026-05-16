import { forwardRef } from 'react'

const VideoGalleryPage = forwardRef(function VideoGalleryPage(props, ref) {
  return (
    <div className="page" ref={ref}>
      <div className="page-content video-gallery-page">
        <div className="video-gallery-container">
          <div className="expert-intro-box">
            <p className="video-gallery-intro">
              Tonton 2 video di bawah ini. Pada masing-masing video terdapat
              teknologi yang digunakan pada Sistem Irigasi pertanian.
            </p>
          </div>

          <div
            className="video-wrapper"
            onPointerDownCapture={(e) => e.stopPropagation()}
            onMouseDownCapture={(e) => e.stopPropagation()}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onPointerUpCapture={(e) => e.stopPropagation()}
            onClickCapture={(e) => e.stopPropagation()}
          >
            <iframe
              className="video-frame"
              src="https://www.youtube.com/embed/fPdAsZtuw34?si=YPEXPgMGgMZzEoCF"
              title="Video Irigasi 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>

          <div
            className="video-wrapper"
            onPointerDownCapture={(e) => e.stopPropagation()}
            onMouseDownCapture={(e) => e.stopPropagation()}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onPointerUpCapture={(e) => e.stopPropagation()}
            onClickCapture={(e) => e.stopPropagation()}
          >
            <iframe
              className="video-frame"
              src="https://www.youtube.com/embed/I3RUFh1-87k?si=j6N7xQmZKTuroFL9"
              title="Video Irigasi 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>

          <p className="video-gallery-note">
            *tekan tombol <i>play</i>, video mungkin membutuhkan waktu untuk memunculkan
            gambar
          </p>
        </div>
      </div>
    </div>
  )
})

export default VideoGalleryPage
