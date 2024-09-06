import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import Logo from '../../assets/Logo.svg';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Nav items in Indonesian
  const navItems = [
    { link: 'Beranda', path: '/' },
    { link: 'Tentang Kami', path: '/about' },
    { link: 'Tambah Buku', path: '/admin/dashboard' },
  ];

  return (
    <header
      className={`${
        isSticky
          ? 'fixed top-0 left-0 w-full h-16 z-50 bg-green-800 shadow-lg'
          : ''
      }`}>
      <nav className='flex items-center justify-between p-5 bg-green-800'>
        {/* Logo */}
        <Link to='/'>
          <img
            src={Logo}
            alt='Logo'
            className='h-16 items-center cursor-pointer'
          />
        </Link>

        {/* Nav items for large devices */}
        <ul className='md:flex space-x-12 hidden'>
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className='block text-base text-white uppercase cursor-pointer hover:text-yellow-500'>
              {link}
            </Link>
          ))}
        </ul>

        {/* Menu button for mobile devices */}
        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none'>
            {isMenuOpen ? (
              <FaXmark className='w-5 h-5 text-white hover:text-yellow-500' />
            ) : (
              <FaBarsStaggered className='w-5 h-5 text-white hover:text-yellow-500' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-yellow-500 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden'
        }`}>
        <ul className='space-y-4 px-4 mt-0 py-7'>
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className='block text-base text-white uppercase cursor-pointer hover:text-green-800'>
              {link}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
