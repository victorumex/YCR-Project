import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { GrungeCorner } from '@/components/GrungeSection';
import PageTransition from '@/components/PageTransition';

// --- IMPORT LOGO & ASSETS ---
import LOGO_MAIN from '../assets/Business Card (2).png'; 

// Import tekstur
import BRUSH_SLASH from '../assets/elemen4.PNG';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // MENGAMBIL DATA DARI SUPABASE
  useEffect(() => {
    async function fetchFeatured() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('featured_displays')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setFeatured(data || []);
      } catch (error) {
        console.error('Gagal mengambil produk unggulan:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <PageTransition>
    <div>
      {/* HERO SECTION */}
      <section
        className="relative min-h-[700px] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pb-28"
        style={{ background: '#FCFCFC' }}
      >
        {/* BACKGROUND YCR BESAR (STATIS) */}
        <img
          src={LOGO_MAIN}
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '140vw', // Membuatnya sangat besar melebihi layar
            minWidth: '1200px', // Batas minimal ukuran agar tidak terlalu kecil di HP
            opacity: 0.05, // Transparansi yang sama dengan background sebelumnya
          }}
        />


        {/* Logo Utama (Tengah) + CTA */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center mt-12">
          <img
            src={LOGO_MAIN}
            alt="YCR"
            className="stamp-in"
            style={{ width: 'min(500px, 80vw)', maxWidth: '500px', marginBottom: '2rem' }}
          />
          <p
            className="text-base md:text-lg tracking-[0.3em] uppercase mb-12"
            style={{ fontFamily: 'Inter, sans-serif', color: '#555', letterSpacing: '0.3em' }}
          >
            Streetwear. Edgy. Culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/collection"
              className="jitter px-10 py-4 text-base tracking-widest uppercase"
              style={{ background: '#0A0A0A', color: '#FCFCFC', fontFamily: 'JetBrains Mono, monospace', display: 'inline-block' }}
            >
              View Collection
            </Link>
            <Link
              to="/about"
              className="px-10 py-4 text-base tracking-widest uppercase border-2 transition-all duration-300"
              style={{ 
                borderColor: '#0A0A0A', 
                color: '#0A0A0A',
                fontFamily: 'JetBrains Mono, monospace', 
                display: 'inline-block' 
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0A0A0A';
                e.target.style.color = '#FCFCFC';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#0A0A0A';
              }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-10">
          <img src={BRUSH_SLASH} alt="" aria-hidden className="w-16 opacity-40" />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {isLoading ? (
        <div className="text-center py-24" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Loading Collective Files...
        </div>
      ) : featured.length > 0 && (
        <section className="relative py-24 px-6" style={{ background: '#F2F2F2' }}>
          <GrungeCorner
            className="absolute top-0 left-0 w-64 h-64"
            opacity={0.12}
          />

          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                  — New Drop
                </p>
                <h2
                  className="text-6xl md:text-8xl"
                  style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A', lineHeight: 0.9 }}
                >
                  Featured
                </h2>
              </div>
              <Link
                to="/collection"
                className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase border-b-2 pb-1 hover:opacity-60 transition-opacity"
                style={{ borderColor: '#0A0A0A', color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}
              >
                All Pieces →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} isFeatured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MANIFESTO SECTION */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
        <img
          src={LOGO_MAIN}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.08, mixBlendMode: 'screen', filter: 'invert(1)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="text-7xl md:text-9xl mb-8"
            style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC', lineHeight: 0.85 }}
          >
            Not a brand. A movement.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-12" style={{ color: '#888', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
            YCR was born on the streets, forged in concrete and ink. Every piece is a statement against the ordinary.
          </p>
          
          
          <Link
            to="/about"
            className="jitter inline-block px-12 py-4 tracking-widest uppercase text-sm"
            style={{ background: '#FCFCFC', color: '#0A0A0A', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Read The Manifesto
          </Link>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}