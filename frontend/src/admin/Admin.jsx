import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [book, setBook] = useState({
    bookTitle: '',
    authorName: '',
    category: '',
    bookDescription: '',
    imageURL: '',
    bookPdfURL: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [bookId, setBookId] = useState(null); // Untuk menyimpan ID buku yang akan diupdate
  const [errors, setErrors] = useState({}); // Untuk menyimpan error validasi
  const [books, setBooks] = useState([]); // Untuk menyimpan daftar buku
  const [currentPage, setCurrentPage] = useState(1); // Untuk halaman saat ini
  const [booksPerPage] = useState(5); // Jumlah buku per halaman

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // Redirect ke halaman login
  };

  // Fetch data buku dari API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          'https://website-rumah-baca-cibolang-api.vercel.app/all-books'
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Fungsi untuk menangani perubahan input di form
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Fungsi validasi form
  const validateForm = () => {
    const newErrors = {};
    if (!book.bookTitle) newErrors.bookTitle = 'Judul Buku harus diisi';
    if (!book.authorName) newErrors.authorName = 'Penulis Buku harus diisi';
    if (!book.category) newErrors.category = 'Kategori Buku harus diisi';
    if (!book.bookDescription)
      newErrors.bookDescription = 'Deskripsi Buku harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true jika tidak ada error
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Jika validasi gagal, tidak lanjutkan submit

    try {
      const url = isEditing
        ? `https://website-rumah-baca-cibolang-api.vercel.app/book/${bookId}` // URL untuk update buku
        : 'https://website-rumah-baca-cibolang-api.vercel.app/upload-book'; // URL untuk menambahkan buku baru

      const method = isEditing ? 'PATCH' : 'POST'; // Menentukan metode HTTP

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book), // Pastikan data dikirim dalam bentuk JSON
      });

      if (response.ok) {
        alert(
          isEditing ? 'Buku berhasil diupdate!' : 'Buku berhasil ditambahkan!'
        );
        setBook({
          bookTitle: '',
          authorName: '',
          category: '',
          bookDescription: '',
          imageURL: '',
          bookPdfURL: '',
        });
        setIsEditing(false);
        setBookId(null);
        setErrors({}); // Bersihkan error setelah submit berhasil

        // Refresh daftar buku
        const updatedBooks = await (
          await fetch(
            'https://website-rumah-baca-cibolang-api.vercel.app/all-books'
          )
        ).json();
        setBooks(updatedBooks);
      } else {
        alert('Gagal menyimpan data buku!');
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Fungsi untuk klik Edit
  const handleEdit = (book) => {
    setBook({
      bookTitle: book.bookTitle,
      authorName: book.authorName,
      category: book.category,
      bookDescription: book.bookDescription,
      imageURL: book.imageURL,
      bookPdfURL: book.bookPdfURL,
    });
    setIsEditing(true);
    setBookId(book._id); // Menyimpan ID buku untuk diupdate
  };

  // Fungsi untuk klik Hapus
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://website-rumah-baca-cibolang-api.vercel.app/book/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        alert('Buku berhasil dihapus!');
        const updatedBooks = await (
          await fetch(
            'https://website-rumah-baca-cibolang-api.vercel.app/all-books'
          )
        ).json();
        setBooks(updatedBooks);
      } else {
        alert('Gagal menghapus buku!');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Logika pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>
          {isEditing ? 'Update Buku' : 'Tambah Buku'}
        </h2>

        <button
          onClick={handleLogout}
          className='bg-red-600 text-white w-24 p-2 rounded-full hover:bg-red-800'>
          Keluar
        </button>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='bookTitle'
          value={book.bookTitle}
          onChange={handleChange}
          placeholder='Judul Buku'
          className={`p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none ${
            errors.bookTitle ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.bookTitle && <p className='text-red-500'>{errors.bookTitle}</p>}

        <input
          type='text'
          name='authorName'
          value={book.authorName}
          onChange={handleChange}
          placeholder='Penulis Buku'
          className={`p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none ${
            errors.authorName ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.authorName && (
          <p className='text-red-500'>{errors.authorName}</p>
        )}

        <input
          type='text'
          name='category'
          value={book.category}
          onChange={handleChange}
          placeholder='Kategori Buku'
          className={`p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none ${
            errors.category ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.category && <p className='text-red-500'>{errors.category}</p>}

        <textarea
          name='bookDescription'
          value={book.bookDescription}
          onChange={handleChange}
          placeholder='Deskripsi Buku'
          className={`p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none ${
            errors.bookDescription ? 'border-red-500' : ''
          }`}
          rows='4'
          required
        />
        {errors.bookDescription && (
          <p className='text-red-500'>{errors.bookDescription}</p>
        )}

        <input
          type='text'
          name='imageURL'
          value={book.imageURL}
          onChange={handleChange}
          placeholder='URL Gambar Buku'
          className='p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none'
        />

        <input
          type='text'
          name='bookPdfURL'
          value={book.bookPdfURL}
          onChange={handleChange}
          placeholder='URL PDF Buku'
          className='p-2 border border-gray-300 rounded-lg focus:border-2 focus:border-green-800 focus:outline-none'
        />

        <button
          type='submit'
          className='bg-green-800 text-white p-2 rounded-lg hover:bg-yellow-500'>
          {isEditing ? 'Update Buku' : 'Tambah Buku'}
        </button>
      </form>

      <h2 className='text-2xl font-bold mt-8 mb-4'>Daftar Buku</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider'>
              Judul Buku
            </th>
            <th className='px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider'>
              Penulis Buku
            </th>
            <th className='px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider'>
              Kategori Buku
            </th>
            <th className='px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {currentBooks.map((book) => (
            <tr key={book._id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {book.bookTitle}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {book.authorName}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {book.category}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                <button
                  onClick={() => handleEdit(book)}
                  className='text-blue-600 hover:text-blue-800 mr-4'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className='text-red-600 hover:text-red-800'>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='mt-4'>
        <ul className='flex justify-center'>
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map(
            (_, index) => (
              <li key={index} className='mx-1'>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-green-700 text-white'
                      : 'bg-white border-gray-300 text-green-700'
                  }`}>
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
