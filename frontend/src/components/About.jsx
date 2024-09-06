import Profile from '../assets/Profile.jpg';

const About = () => {
  return (
    <div className='p-5'>
      <div>
        {/* Gambar Rumah Baca */}
        <div className='flex justify-center mb-6 w-full h-auto'>
          <img
            src={Profile}
            alt='Rumah Baca Dusun Cibolang'
            className='rounded-lg shadow-lg'
          />
        </div>
        <h1 className='text-3xl font-bold'>Tentang Kami</h1>
        <p className='mt-2 text-lg'>
          Selamat datang di <strong>Rumah Baca Dusun Cibolang</strong>, sebuah
          oase ilmu pengetahuan di tengah keindahan alam Jawa Barat. Di sini,
          kami percaya bahwa setiap halaman buku yang terbuka adalah jendela
          menuju dunia yang lebih luas. Kami berdedikasi untuk memberikan akses
          yang mudah dan inklusif terhadap berbagai sumber bacaan berkualitas.
        </p>
        <p className='mt-4 text-lg'>
          Tidak hanya sekadar tempat untuk membaca, Rumah Baca Dusun Cibolang
          adalah ruang di mana ide-ide besar dilahirkan, di mana komunitas
          bersatu untuk belajar dan tumbuh bersama. Kami menyediakan suasana
          yang mendukung pembelajaran, diskusi, dan kolaborasi bagi semua
          kalangan.
        </p>
        <p className='mt-4 text-lg'>
          Dengan koleksi buku yang terus berkembang, kami berharap bisa
          menginspirasi generasi muda dan tua untuk selalu haus akan
          pengetahuan. Karena kami percaya, bahwa membaca bukan hanya kegiatan,
          tapi sebuah perjalanan yang membawa kita ke tempat-tempat yang belum
          pernah kita kunjungi, dan memberi makna baru dalam kehidupan kita.
        </p>
      </div>

      {/* Deskripsi Lokasi */}
      <div className='mt-6'>
        <h2 className='text-2xl font-semibold'>Lokasi Kami</h2>
        <p className='mt-2 text-lg'>
          Rumah Baca Dusun Cibolang terletak di lingkungan yang tenang dan
          damai, cocok untuk kegiatan belajar dan membaca. Kami berlokasi di
          Dusun I Cibolang, Desa Bajansari, Kecamatan Pangalengan, Kabupaten
          Bandung, Provinsi Jawa Barat. Nikmati udara segar sambil mengisi jiwa
          dengan pengetahuan baru di tempat kami.
        </p>

        {/* Peta Lokasi (embed dari Google Maps) */}
        <div className='flex flex-col text-center justify-center items-center mt-2'>
          <iframe
            title='Lokasi Rumah Baca Dusun Cibolang'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31632.00570887079!2d107.44389011397544!3d-7.259715199209714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e1fb1b8f429d%3A0x14d462d2b3d1fa2a!2sRumah%20Baca%20Dusun%20Cibolang!5e0!3m2!1sid!2sid!4v1694000000000!5m2!1sid!2sid'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='rounded-lg shadow-lg w-full h-80'></iframe>

          <p className='mt-2 text-base'>
            Klik link berikut untuk mengetahui lokasi kami di Google Maps:{' '}
            <a
              href='https://maps.app.goo.gl/sjAb32zqCvFdfafCA'
              target='_blank'
              rel='noopener noreferrer'
              className='text-green-800 hover:text-yellow-500 underline'>
              Lihat di Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
