import { Link } from 'react-router-dom';
import LOGO_HITAM from '../assets/logo_hitam.PNG';

export default function Footer() {
  const tickerItems = ['YCR', '///', 'STREETWEAR', '///', 'EDGY', '///', 'CULTURE', '///'];
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  const collectionTabs = [
    { key: 'all', label: 'All' },
    { key: 'tshirt', label: 'T-Shirt' },
    { key: 'hoodie', label: 'Hoodie' },
    { key: 'jacket', label: 'Jacket' },
    { key: 'pants', label: 'Pants' },
    { key: 'accessories', label: 'Accessories' },
  ];

  return (
    <footer style={{ background: '#0A0A0A', color: '#FCFCFC' }}>
      {/* Ticker tape */}
      <div className="overflow-hidden py-4 border-b flex" style={{ borderColor: '#222' }}>
        <div className="ticker-tape flex whitespace-nowrap w-max">
          {repeatedItems.map((item, i) => (
            <span
              key={i}
              className="px-6 text-xl tracking-widest shrink-0"
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 4 kolom rata menyebar (justify-between) */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6 lg:gap-8">
          
          {/* Logo & tagline – rata kiri (eksplisit text-left) */}
          <div className="w-full md:w-1/4 text-left">
            <img src={LOGO_HITAM} alt="YCR" className="h-12 w-auto mb-4" style={{ filter: 'invert(1)' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
              Raw. Unapologetic. Streetwear forged in the underground.
            </p>
          </div>

          {/* Navigate – rata kanan */}
          <div className="w-full md:w-1/4 md:text-right">
            <h4 className="text-lg mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Navigate
            </h4>
            <div className="flex flex-col md:items-end gap-3">
              <Link to="/" className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>Home</Link>
              <Link to="/about" className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>About</Link>
              <Link to="/contact" className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>Contact</Link>
            </div>
          </div>

          {/* Collection – rata kanan */}
          <div className="w-full md:w-1/4 md:text-right">
            <h4 className="text-lg mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Collection
            </h4>
            <div className="flex flex-col md:items-end gap-3">
              {collectionTabs.map(({ key, label }) => (
                <Link
                  key={key}
                  to={`/collection?category=${key}`}
                  className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials – rata kanan (seperti semula) */}
          <div className="w-full md:w-1/4 md:text-right">
            <h4 className="text-lg mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Follow The Movement
            </h4>
            <div className="flex flex-col md:items-end gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/ycr.official_?igsh=NXgxc2Y5dzE3eWE=' },
                { label: 'WhatsApp', href: 'https://wa.me/6285932215911' },
                { label: 'TikTok', href: 'https://tiktok.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #222' }}>
          <p className="text-xs tracking-widest" style={{ color: '#444', fontFamily: 'JetBrains Mono, monospace' }}>
            © 2026 YCR. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs tracking-widest" style={{ color: '#444', fontFamily: 'JetBrains Mono, monospace' }}>
            BUILT FOR THE STREETS
          </p>
        </div>
      </div>
    </footer>
  );
}