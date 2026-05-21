import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { GrungeCorner } from '@/components/GrungeSection';
import INK from '../assets/elemen2.PNG';

const CATEGORIES = ['all', 'tshirt', 'hoodie', 'jacket', 'pants', 'accessories'];

export default function Collection() {
  // Gunakan URL Params untuk kategori agar tidak reset saat direfresh
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  
  // State untuk Sorting
  const [sortBy, setSortBy] = useState('latest');
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [catVisible, setCatVisible] = useState(true);
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

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Gagal mengambil data koleksi:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter Kategori
  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  // Sorting Logika
  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'latest') return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div className="relative py-24 px-6 overflow-hidden" style={{ background: '#F2F2F2' }}>
        <img src={INK} alt="" aria-hidden className="absolute right-0 top-0 w-80 h-80 object-cover pointer-events-none" style={{ opacity: 0.07, mixBlendMode: 'multiply' }} />
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
            — YCR Archive
          </p>
          <h1 className="text-7xl md:text-9xl" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A', lineHeight: 0.85 }}>
            Collection
          </h1>
        </div>
      </div>

      {/* Filter Menu (Sticky) */}
      <div
        className="sticky top-16 z-30 px-6 py-4 flex gap-3 overflow-x-auto transition-transform duration-300"
        style={{
          background: '#FCFCFC',
          borderBottom: '1px solid #E5E5E5',
          transform: catVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="max-w-7xl mx-auto flex gap-3 w-full items-center justify-between">
          <div className="flex gap-3 overflow-x-auto w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat })} // Update URL Parameter
                className="px-5 py-2 text-xs tracking-widest uppercase flex-shrink-0 transition-all duration-200"
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

      {/* Grid Area */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Sort Dropdown */}
        <div className="flex justify-between items-center mb-12 border-b pb-4" style={{ borderColor: '#E5E5E5' }}>
          <p className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#888' }}>
            SHOWING {sortedAndFiltered.length} PRODUCTS
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
              Check back soon — new drops incoming.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sortedAndFiltered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}