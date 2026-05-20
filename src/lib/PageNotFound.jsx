import { useLocation, Link } from 'react-router-dom';

// Anda bisa menggunakan gambar cipratan tinta atau biarkan kosong
import INK from '../assets/elemen3.PNG'; 

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Background Texture */}
      <img 
        src={INK} 
        alt="" 
        aria-hidden 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" 
        style={{ opacity: 0.1, mixBlendMode: 'screen', filter: 'invert(1)' }} 
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="space-y-8">
          
          {/* 404 Error Code */}
          <div>
            <h1 
              className="text-8xl md:text-[12rem] leading-none mb-2" 
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}
            >
              404
            </h1>
            <div className="h-1 w-24 mx-auto" style={{ background: '#FCFCFC' }}></div>
          </div>
          
          {/* Main Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl uppercase tracking-widest" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}>
              Dead End.
            </h2>
            <p className="text-base md:text-lg" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
              The path <span style={{ color: '#FCFCFC', fontFamily: 'JetBrains Mono, monospace' }}>/{pageName}</span> doesn't exist in our archive.
            </p>
          </div>
          
          {/* Action Button */}
          <div className="pt-8">
            <Link 
              to="/" 
              className="jitter inline-block px-12 py-4 text-sm tracking-[0.3em] uppercase transition-colors"
              style={{ 
                background: '#FCFCFC', 
                color: '#0A0A0A', 
                fontFamily: 'JetBrains Mono, monospace' 
              }}
            >
              Return to Base
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}