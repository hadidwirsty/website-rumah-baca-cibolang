import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <main className='cointaner mx-auto px-4'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
