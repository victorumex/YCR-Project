import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh' }}>
      {/* Global scratch texture fixed layer */}
      <div className="scratch-bg" aria-hidden />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}