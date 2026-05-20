import { Link } from 'react-router-dom';

const LOGO = 'https://media.base44.com/images/public/user_69e5c2fc01d922c7d21908c9/5b323aee6_IMG_2827.png';
const BRUSH_SLASH = 'https://media.base44.com/images/public/user_69e5c2fc01d922c7d21908c9/0b82b9c11_1.png';

export default function Footer() {
  const tickerItems = ['YCR', '///', 'STREETWEAR', '///', 'EDGY', '///', 'CULTURE', '///'];

  return (
    <footer style={{ background: '#0A0A0A', color: '#FCFCFC' }}>
      {/* Brush slash top border */}
      <div className="relative h-12 overflow-hidden" style={{ background: '#FCFCFC' }}>
        <img
          src={BRUSH_SLASH}
          alt=""
          className="absolute bottom-0 left-0 w-full h-full object-cover"
          style={{ filter: 'invert(0)', mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Ticker tape */}
      <div className="overflow-hidden py-4 border-b" style={{ borderColor: '#222' }}>
        <div className="ticker-tape">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="px-6 text-xl tracking-widest"
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & tagline */}
          <div>
            <img src={LOGO} alt="YCR" className="h-12 w-auto mb-4" style={{ filter: 'invert(1)' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
              Raw. Unapologetic. Streetwear forged in the underground.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {[['/', 'Home'], ['/collection', 'Collection'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm tracking-widest uppercase hover:text-white transition-colors"
                  style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Follow The Movement
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/by.ycr?igsh=MXhycnd5YW13bnJhNw%3D%3D&utm_source=qr' },
                { label: 'WhatsApp', href: 'https://wa.me/' },
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