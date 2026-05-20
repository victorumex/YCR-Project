import { Link } from 'react-router-dom';
// Sesuaikan nama file ini jika Anda memakai gambar lain untuk efek sapuan kuas
import BRUSH_STROKE from '../assets/elemen3.PNG'; 

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
  'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80',
  'https://images.unsplash.com/photo-1556821840-3a63f15232d0?w=600&q=80',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
];

export default function ProductCard({ product, index = 0 }) {
  const imgSrc = product.image_url || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
  
  return (
    <Link to={`/product/${product.id}`} className="block product-card group relative overflow-hidden bg-white" style={{ marginBottom: 16 }}>
      {/* Paksa semua gambar memiliki proporsi portrait 4:5 yang rapi */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '125%' }}>
        <img
          src={imgSrc}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'grayscale(30%) contrast(1.1)' }}
        />
        {/* Grunge overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Fitur SOLD OUT ini akan menyala jika di Supabase 'in_stock' bernilai FALSE */}
        {!product.in_stock && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs tracking-widest" style={{ background: '#0A0A0A', color: '#FCFCFC', fontFamily: 'JetBrains Mono, monospace' }}>
            SOLD OUT
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 relative">
        {/* Brush stroke behind name on hover */}
        <img
          src={BRUSH_STROKE}
          alt=""
          aria-hidden
          className="brush-reveal absolute left-0 right-0 top-3 w-full h-10 object-cover pointer-events-none"
          style={{ opacity: 0, mixBlendMode: 'multiply', filter: 'invert(0)' }}
        />
        <h3
          className="text-xl relative z-10"
          style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', letterSpacing: '-0.03em', color: '#0A0A0A' }}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span
            className="text-sm"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#555' }}
          >
            {product.category?.toUpperCase()}
          </span>
          <span
            className="font-bold"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}
          >
            IDR {product.price?.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </Link>
  );
}