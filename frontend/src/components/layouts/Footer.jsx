const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-6 mt-10'>
      <div className='container mx-auto text-center'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Rumah Baca Dusun Cibolang. Semua hak
          cipta dilindungi.
        </p>
        <p className='text-sm'>
          Dibuat dengan <span className='text-red-500'>&hearts;</span> oleh Tim
          KKN-PPM UGM Pangalengan Unit C Periode II - MMXXIII
        </p>
      </div>
    </footer>
  );
};

export default Footer;
