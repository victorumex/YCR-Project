import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Definisi Kurva Animasi (Sama seperti di About.jsx) ---
const snapTransition = {
  duration: 0.6,
  ease: [0.19, 1, 0.22, 1], // easeOutExpo
};

export default function ProductCard({ product, index }) {
  // Jika karena suatu alasan data product kosong, kembalikan null agar tidak error
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        ...snapTransition, 
        delay: index * 0.08 // Stagger effect
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
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'grayscale(15%) contrast(1.05)' }}
              // Fallback jika URL gambar dari Supabase mati/error saat diload
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/600x800/E5E5E5/888888?text=NO+IMAGE';
              }}
            />
          ) : (
            // Jika kolom image_url di Supabase kosong
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