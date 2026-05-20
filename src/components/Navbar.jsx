import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LOGO from '../assets/logo_hitam.PNG';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) {
        setVisible(true); // scrolling up → show
      } else if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false); // scrolling down past 60px → hide
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        background: '#FCFCFC',
        borderBottom: '1px solid #E0E0E0',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="w-full px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={LOGO} alt="YCR" className="h-10 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium tracking-widest uppercase hover:opacity-60 transition-opacity"
                style={{
                  color: '#0A0A0A',
                  fontFamily: 'Inter, sans-serif',
                  paddingBottom: '4px',
                  borderBottom: active ? '2px solid #0A0A0A' : '2px solid transparent',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-0.5" style={{ background: '#0A0A0A' }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-6 px-6 flex flex-col gap-5"
          style={{ background: '#FCFCFC', borderTop: '1px solid #E0E0E0' }}
        >
          {navLinks.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className="text-2xl tracking-wider uppercase"
                style={{
                  fontFamily: 'Bebas Neue, Impact, sans-serif',
                  color: active ? '#0A0A0A' : '#888',
                  borderBottom: active ? '2px solid #0A0A0A' : 'none',
                  paddingBottom: active ? '4px' : '0',
                  display: 'inline-block',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}