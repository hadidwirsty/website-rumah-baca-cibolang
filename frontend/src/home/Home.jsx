import { useState, useEffect } from 'react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Nilai defautl Image URL jika tidak ada imageURL yang tersedia dan PDF URL jika tidak ada bookPdfURL yang tersedia
  const defaultImageURL =
    'https://via.placeholder.com/150x200?text=Gambar+Buku+Tidak+Tersedia';
  const defaultPdfURL = '#';

  // Mengambil buku berdasarkan kategori pencarian
  const fetchBooks = async (category = '') => {
    try {
      const queryParam = category ? `?category=${category}` : '';
      const response = await fetch(
        `https://website-rumah-baca-cibolang-api.vercel.app/all-books${queryParam}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Mengambil semua buku saat komponen di-mount atau ketika kategori berubah
  useEffect(() => {
    fetchBooks(searchCategory);
  }, [searchCategory]);

  // Menangani pengiriman form pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    // Mengubah pencarian ke huruf kecil sebelum mengirimkannya
    fetchBooks(searchCategory.toLowerCase());
  };

  // Mengubah status deskripsi yang diperluas untuk setiap buku
  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-1 mb-4'>
        <h1 className='font-bold text-3xl'>
          Selamat Datang di Website Rumah Baca Dusun Cibolang!
        </h1>
        <p className='font-normal text-lg'>
          Temukan buku-buku dalam berbagai kategori.
        </p>
      </div>

      {/* Bar Pencarian */}
      <div className='block text-center'>
        <form onSubmit={handleSearch} className='flex justify-center'>
          <input
            type='text'
            placeholder='Cari berdasarkan kategori'
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className='w-80 p-2 mr-2 text-base border-2 border-solid rounded-lg focus:border-green-800 focus:outline-none'
          />
          <button
            type='submit'
            className='w-40 p-2 bg-green-800 text-white border-none rounded-full cursor-pointer hover:bg-yellow-500 hover:font-bold'>
            Cari
          </button>
        </form>
        <p className='font-light mt-2 text-lg text-gray-800'>
          <strong>Catatan:</strong> Cara untuk mencari kategori harus diawali
          dengan huruf
          <span className='font-semibold'> Kapital</span>, misalnya{' '}
          <span className='italic'>Horor</span>.
        </p>
      </div>

      {/* Daftar Buku */}
      <div className='flex flex-wrap justify-center p-5'>
        {books.length > 0 ? (
          books.map((book) => {
            const isExpanded = expandedDescriptions[book._id];
            // Ensure bookDescription is defined before calling slice
            const description = book.bookDescription
              ? isExpanded
                ? book.bookDescription
                : `${book.bookDescription.slice(0, 100)}...`
              : 'Deskripsi tidak tersedia';

            return (
              <div
                key={book._id}
                className='bg-white border border-solid border-gray-300 shadow-lg m-4 w-80 flex flex-col justify-between p-6 rounded-lg min-h-[450px]'>
                {/* Gambar */}
                <img
                  src={book.imageURL || defaultImageURL}
                  alt={book.bookTitle}
                  className='w-full h-96 rounded-lg mb-4'
                />

                {/* Info Buku */}
                <div className='flex-grow'>
                  <h2 className='font-bold text-xl'>{book.bookTitle}</h2>
                  <p className='font-normal text-base'>
                    <strong>Penulis:</strong> {book.authorName}
                  </p>
                  <p className='font-normal text-base'>
                    <strong>Kategori:</strong> {book.category}
                  </p>
                  <p className='font-normal text-base'>{description}</p>
                  <button
                    onClick={() => toggleDescription(book._id)}
                    className='text-green-800 hover:text-yellow-500 underline'>
                    {isExpanded
                      ? 'Tampilkan lebih sedikit'
                      : 'Baca lebih lanjut'}
                  </button>
                </div>

                {/* Tombol Baca lebih lanjut */}
                <a
                  href={book.bookPdfURL || defaultPdfURL}
                  target={book.bookPdfURL ? '_blank' : '_self'}
                  rel={book.bookPdfURL ? 'noopener noreferrer' : ''}
                  className={`block mt-4 p-2 text-center rounded-full text-white ${
                    book.bookPdfURL
                      ? 'bg-green-800 hover:bg-yellow-500 hover:font-bold'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}>
                  {book.bookPdfURL
                    ? 'Baca detail lengkap'
                    : 'PDF tidak tersedia'}
                </a>
              </div>
            );
          })
        ) : (
          <p>Tidak ada buku ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default Home;
