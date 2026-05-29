import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import PageTransition from '@/components/PageTransition'; 
import LOGO_MAIN from '../assets/Business Card (2).png'; 

const CATEGORIES = ['all', 'tshirt', 'hoodie', 'jacket', 'pants', 'accessories'];

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  
  // Menangkap ID Set dari URL jika pengguna datang dari Home (Featured)
  const setId = searchParams.get('set'); 
  
  const [sortBy, setSortBy] = useState('latest');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [catVisible, setCatVisible] = useState(true);
  
  // State untuk menyimpan nama Lookbook jika mode "Shop the Look" aktif
  const [setName, setSetName] = useState('');
  
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) {
        setCatVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 100) {
        setCatVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIKA PENGAMBILAN DATA (NORMAL vs SHOP THE LOOK)
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);

        if (setId) {
          // MODE "SHOP THE LOOK": Ambil data tabel Featured dulu
          const { data: setData, error: setError } = await supabase
            .from('featured_displays')
            .select('name, product_ids')
            .eq('id', setId)
            .single();

          if (setError) throw setError;

          if (setData) {
            setSetName(setData.name); // Simpan nama set untuk judul halaman
            
            // Ambil produk yang ID-nya cocok dengan isi product_ids di set tersebut
            const ids = Array.isArray(setData.product_ids) ? setData.product_ids : [];
            
            if (ids.length > 0) {
              const { data: productsData, error: prodError } = await supabase
                .from('products')
                .select('*')
                .in('id', ids);
                
              if (prodError) throw prodError;
              setProducts(productsData || []);
            } else {
              setProducts([]); // Jika set belum diisi ID produk
            }
          }
        } else {
          // MODE NORMAL: Ambil semua produk biasa
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

          if (error) throw error;
          setProducts(data || []);
          setSetName('');
        }
      } catch (error) {
        console.error('Gagal mengambil data koleksi:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [setId]); // Efek ini akan berjalan ulang setiap kali 'set' di URL berubah

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'latest') return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  return (
    <PageTransition>
      <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
        
        {/* Header (TERANG) */}
        <div className="relative py-24 px-6 overflow-hidden" style={{ background: '#F2F2F2' }}>
          <img 
            src={LOGO_MAIN} 
            alt="" 
            aria-hidden 
            className="absolute pointer-events-none select-none" 
            style={{ 
              top: '50%', 
              left: '75%', 
              transform: 'translate(-50%, -50%)', 
              width: '180vw', 
              minWidth: '1500px', 
              opacity: 0.04 
            }} 
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
              — {setId ? 'SHOP THE LOOK' : 'YCR Archive'}
            </p>
            <h1 className="text-7xl md:text-9xl" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A', lineHeight: 0.85 }}>
              {setId ? setName : 'Collection'}
            </h1>
            
            {/* TOMBOL CLEAR FILTER (Muncul hanya jika membuka dari set) */}
            {setId && (
              <Link 
                to="/collection" 
                className="inline-block mt-8 text-xs tracking-widest uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}
              >
                ← View All Collection
              </Link>
            )}
          </div>
        </div>

        {/* Filter Menu (Sembunyikan jika sedang mode Shop the Look) */}
        {!setId && (
          <div
            className="sticky top-16 z-30 w-full transition-transform duration-300"
            style={{
              background: '#FCFCFC',
              borderBottom: '1px solid #E5E5E5',
              transform: catVisible ? 'translateY(0)' : 'translateY(-100%)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-3 w-max items-center">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className="px-5 py-2 text-xs tracking-widest uppercase flex-shrink-0 transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      background: activeCategory === cat ? '#0A0A0A' : 'transparent',
                      color: activeCategory === cat ? '#FCFCFC' : '#555',
                      border: '1px solid',
                      borderColor: activeCategory === cat ? '#0A0A0A' : '#DDD',
                    }}
                  >
                    {cat === 'all' ? 'All' : cat.replace('tshirt', 'T-Shirt').replace('hoodie', 'Hoodie').replace('jacket', 'Jacket').replace('pants', 'Pants').replace('accessories', 'Acc.')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid Area */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          <div className="flex justify-between items-center mb-12 border-b pb-4" style={{ borderColor: '#E5E5E5' }}>
            <p className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#888' }}>
              SHOWING {sortedAndFiltered.length} PIECES
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#555' }}>SORT:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs uppercase tracking-widest outline-none cursor-pointer"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}
              >
                <option value="latest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse mb-4" style={{ height: '400px' }} />
              ))}
            </div>
          ) : sortedAndFiltered.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-6xl mb-4" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#CCC' }}>
                No Pieces Found
              </p>
              <p className="text-sm tracking-wider" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                {setId ? 'The items in this look are not available yet.' : 'Check back soon — new drops incoming.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {sortedAndFiltered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}