import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi username dan password
    if (username === 'admin' && password === 'pass!32') {
      // Simpan status login ke localStorage
      localStorage.setItem('isAuthenticated', 'true');
      // Redirect ke halaman admin
      navigate('/admin/dashboard');
    } else {
      setError('Nama Pengguna atau Kata Sandi salah');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-xs'>
        <form
          onSubmit={handleSubmit}
          className='bg-green-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border space-y-10'>
          <h2 className='text-2xl font-bold text-center text-white mt-2'>
            Login
          </h2>
          <div className='space-y-2'>
            {error && (
              <p className='text-center text-white text-xs italic'>{error}</p>
            )}
            <div>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='username'>
                Nama Penggua
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Nama pengguna'
                className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>

            <div>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='password'>
                Kata Sandi
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
                className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-yellow-500 hover:bg-yellow-300 text-white font-bold w-full py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
