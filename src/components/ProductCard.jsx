import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// Tambahkan prop 'isFeatured' dengan default false
export default function ProductCard({ product, isFeatured = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 }); 
  const [hideY, setHideY] = useState(100);
  
  // State untuk mengontrol indeks gambar (Slider)
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;

    if (rect.top < windowCenter) {
      setHideY(-100);
    } else {
      setHideY(100);
    }
  }, [isInView]);

  if (!product) return null;

  // Membaca array gambar dari database
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.image_url ? [product.image_url] : []);

  const nextImage = (e) => {
    e.preventDefault(); 
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault(); 
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }} 
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : hideY,
        scale: isInView ? 1 : 0.95 
      }}
      transition={{
        duration: isInView ? 1.4 : 0.4, 
        ease: isInView 
          ? [0.25, 1, 0.35, 1] 
          : [0.55, 0.05, 0.68, 0.19] 
      }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        
        {/* WADAH GAMBAR */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E5E5] mb-4">
          {images.length > 0 ? (
            <>
              <img
                src={images[imgIndex]}
                alt={product.name || 'YCR Product'}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ filter: 'grayscale(15%) contrast(1.05)' }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/600x800/E5E5E5/888888?text=NO+IMAGE';
                }}
              />

              {/* TOMBOL SLIDER JIKA GAMBAR > 1 */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={prevImage} className="bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black transition-colors z-10 backdrop-blur-sm">←</button>
                  <button onClick={nextImage} className="bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black transition-colors z-10 backdrop-blur-sm">→</button>
                </div>
              )}

              {/* INDIKATOR TITIK (Dots) */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {images.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#888] font-mono text-xs tracking-widest">
              NO IMAGE
            </div>
          )}

          {/* LABEL SOLD OUT */}
          {product.in_stock === false && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
              <span className="px-4 py-2 bg-black text-white text-xs tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Sold Out
              </span>
            </div>
          )}
        </div>
        
        {/* TEKS DETAIL PRODUK */}
        <div className="flex justify-between items-start mt-4">
          <div>
            {/* JIKA BUKAN FEATURED, TAMPILKAN KATEGORI */}
            {!isFeatured && (
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                {product.category || 'Uncategorized'}
              </p>
            )}

            <h3 className="text-lg uppercase" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
              {product.name || 'Unnamed Product'}
            </h3>
          </div>

          {/* JIKA BUKAN FEATURED, TAMPILKAN HARGA */}
          {!isFeatured && (
            <p className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}>
              IDR {product.price ? product.price.toLocaleString('id-ID') : '0'}
            </p>
          )}
        </div>

      </Link>
    </motion.div>
  );
}