import { forwardRef } from 'react'

const TeacherTaskPage = forwardRef(function TeacherTaskPage(props, ref) {
  return (
    <div className="page" ref={ref}>
      <div className="page-content teacher-task-page">
        <div className="student-board">
          <div className="student-board-inner">
            <div className="cover-bunting student-board-bunting">
              <span className="cover-flag cover-flag-1" />
              <span className="cover-flag cover-flag-2" />
              <span className="cover-flag cover-flag-3" />
              <span className="cover-flag cover-flag-4" />
              <span className="cover-flag cover-flag-5" />
            </div>

            <div className="teacher-board-body">
              <div className="teacher-avatar-wrapper">
                <img
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                  alt="Ilustrasi dosen yang memberikan penjelasan"
                  className="teacher-avatar-image"
                />
              </div>

              <div className="teacher-text-panel">
                <p className="teacher-text-intro">
                  Dalam pelaksanaan tugas tersebut, Bapak Hamka meminta mahasiswa
                  untuk mengkaji beberapa aspek utama yang berkaitan dengan sistem
                  irigasi pertanian di Kota X, yaitu{' '}
                  <strong>permasalahan</strong> yang ditemukan,{' '}
                  <strong>solusi</strong> yang dapat ditawarkan, serta{' '}
                  <strong>konsekuensi</strong> atau dampak dari solusi yang
                  dikemukakan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default TeacherTaskPage

