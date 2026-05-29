import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

export default function ProductCard({ product }) {
  // Ref untuk mendeteksi posisi elemen
  const ref = useRef(null);
  
  // TRIGGER: Animasi berjalan jika minimal 30% elemen terlihat.
  const isInView = useInView(ref, { amount: 0.3 }); 
  
  // State untuk arah tarikan (jarak dikurangi jadi 100 agar gerakannya lebih santai dan tidak ngotot)
  const [hideY, setHideY] = useState(100);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;

    // LOGIKA TARIKAN CERDAS:
    if (rect.top < windowCenter) {
      setHideY(-100);
    } else {
      setHideY(100);
    }
  }, [isInView]);

  if (!product) return null;

  return (
    <motion.div
      ref={ref}
      // Scale dibuat 0.95 agar efek membesarnya tipis dan terlihat mahal
      initial={{ opacity: 0, y: 100, scale: 0.95 }} 
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : hideY,
        scale: isInView ? 1 : 0.95 
      }}
      transition={{
        // PERBAIKAN: Saat muncul diperlambat menjadi 1.4 detik agar "super smooth"
        // Saat keluar tetap 0.4 detik agar cepat memberi ruang
        duration: isInView ? 1.4 : 0.4, 
        
        // Kurva Animasi
        ease: isInView 
          ? [0.25, 1, 0.35, 1] // Kurva melambat di akhir yang sangat lembut (Decelerate)
          : [0.55, 0.05, 0.68, 0.19] // Tetap menghentak saat diserap keluar
      }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        
        {/* WADAH GAMBAR */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E5E5] mb-4">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name || 'YCR Product'}
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ filter: 'grayscale(15%) contrast(1.05)' }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/600x800/E5E5E5/888888?text=NO+IMAGE';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#888] font-mono text-xs tracking-widest">
              NO IMAGE
            </div>
          )}

          {/* LABEL SOLD OUT */}
          {product.in_stock === false && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="px-4 py-2 bg-black text-white text-xs tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Sold Out
              </span>
            </div>
          )}
        </div>
        
        {/* TEKS DETAIL PRODUK */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
              {product.category || 'Uncategorized'}
            </p>
            <h3 className="text-lg uppercase" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
              {product.name || 'Unnamed Product'}
            </h3>
          </div>
          <p className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}>
            IDR {product.price ? product.price.toLocaleString('id-ID') : '0'}
          </p>
        </div>

      </Link>
    </motion.div>
  );
}