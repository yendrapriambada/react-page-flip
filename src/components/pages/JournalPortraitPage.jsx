import React, { forwardRef } from 'react';

const JournalPortraitPage = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content journal-page">
        <div className="journal-topbar">
          <span className="journal-edition"><i>NOV. 2023 | VOL. 8</i></span>
        </div>

        <div className="journal-header">
          <h1 className="journal-title"><i>JOURNAL SCIENCE EDUCATION</i></h1>
          <p className="journal-subtitle"><i>Official publication of the University of El Dorado</i></p>
          <div className="journal-divider" />
        </div>

        <div className="expert-intro-box">
          <div className="journal-content">
            <div className="journal-left">
              <div className="journal-image-box">
                <img
                  className="journal-image"
                  src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Digital media and water resources"
                />
              </div>
              <div className="journal-article-meta">
                <h3 className="journal-article-title">
                  Peran Media Digital dalam Pengelolaan Sumber Daya Air untuk Irigasi Pertanian
                </h3>
                <span className="journal-author">Hamka</span>
              </div>
              <p className="journal-lead">
                Dalam beberapa tahun terakhir, para petani di berbagai wilayah di Indonesia
                menghadapi tantangan yang semakin kompleks terkait pengelolaan sumberdaya air
                untuk irigasi.
              </p>
            </div>

            <div className="journal-right">
              <p>
                Ketersediaan air yang tidak menentu, terutama di daerah yang jauh dari sumber air
                atau yang sering mengalami kekeringan, mengharuskan petani mencari alternatif
                teknologi untuk memastikan tanaman mereka mendapat pasokan air yang cukup.
              </p>
              <p>
                Teknologi irigasi modern, seperti penggunaan pompa tenaga surya dalam sistem
                irigasi pertanian, menjadi salah satu solusi yang banyak diperbincangkan. Meskipun
                menjanjikan dengan berbagai keuntungan, juga membawa dampak negatif yang signifikan. Namun, akses terhadap informasi tentang teknologi tersebut masih jarang dilakukan, terutama bagi petani di daerah terpencil.
              </p>
              <p>
                Dalam situasi ini, keberadaan sumberdaya digital menjadi sangat penting. Internet
                menyediakan beragam sumberdaya digital yang dapat membantu petani memahami,
                menerapkan, dan memanfaatkan teknologi irigasi dengan lebih efektif, misalkan <i>YouTube</i>, <i>e-book</i>, jurnal ilmiah, dll.
              </p>
              <p>
                Namun, tidak semua informasi di internet memiliki kredibilitas yang tinggi. Oleh
                karena itu, penting bagi petani untuk dapat memilah mana sumber daya digital yang
                relevan dan dapat dipercaya.
              </p>
            </div>
          </div>
        </div>

        <div className="page-number">— <i>Journal</i> —</div>
      </div>
    </div>
  );
});

export default JournalPortraitPage;
