import React, { forwardRef } from 'react';

// URL Placeholder sementara karena file lokal belum ada di folder assets.
// Setelah Anda menyimpan gambar Anda sebagai 'src/assets/announcement.jpg',
// silakan uncomment baris import di bawah ini dan gunakan variabel 'announcementImg'.

// import announcementImg from '../../assets/announcement.jpg'; 
const placeholderImg = "https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Gambar kertas/pengumuman dari Pexels

const AnnouncementPage = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content" style={{ padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <div style={{ width: '100%', height: '100%', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                // Ganti placeholderImg dengan announcementImg setelah file tersedia
                src={placeholderImg} 
                alt="Pengumuman Penting" 
                style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            />
        </div>
        <div className="page-number">— Pengumuman —</div>
      </div>
    </div>
  );
});

export default AnnouncementPage;
