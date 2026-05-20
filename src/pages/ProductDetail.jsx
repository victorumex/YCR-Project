import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // Menggunakan Supabase

// Memperbaiki path gambar menggunakan import bawaan Vite
import DIAGONAL from "../assets/elemen2.PNG";
import INK from "../assets/elemen3.PNG";
// Placeholder default jika produk belum memiliki foto
const PLACEHOLDER = 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80'; 

export default function ProductDetail() {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil detail 1 produk spesifik berdasarkan ID dari URL
  useEffect(() => {
    async function fetchProductDetail() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single(); // Ambil satu data saja
          
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Gagal mengambil detail produk:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '64px' }}>
        <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ paddingTop: '64px' }}>
        <p className="text-6xl" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>Product Not Found</p>
        <Link to="/collection" className="underline text-sm tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Back to Collection
        </Link>
      </div>
    );
  }

  const waMessage = encodeURIComponent(`Hi YCR! I'm interested in purchasing: *${product.name}* (IDR ${product.price?.toLocaleString('id-ID')}). Please let me know the availability.`);
  // Ganti nomor di bawah ini dengan nomor WhatsApp aktif Anda (gunakan kode negara 62)
  const waLink = `https://wa.me/6285932215911?text=${waMessage}`; 

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-12 hover:opacity-60 transition-opacity"
          style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace' }}
        >
          ← Back to Collection
        </Link>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image - Left */}
          <div className="relative overflow-hidden" style={{ background: '#F2F2F2' }}>
            <img
              src={product.image_url || PLACEHOLDER}
              alt={product.name}
              className="w-full h-full object-cover stamp-in"
              style={{ minHeight: '500px', filter: 'grayscale(20%) contrast(1.05)' }}
            />
            <img
              src={INK}
              alt=""
              aria-hidden
              className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
              style={{ opacity: 0.08, mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Details - Right */}
          <div className="px-0 lg:px-16 py-8 flex flex-col justify-between" style={{ borderLeft: '1px solid #E5E5E5' }}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs px-2 py-1 tracking-widest uppercase"
                  style={{
                    background: '#0A0A0A',
                    color: '#FCFCFC',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {product.category?.toUpperCase()}
                </span>
                {!product.in_stock && (
                  <span className="text-xs tracking-widest uppercase" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                    OUT OF STOCK
                  </span>
                )}
              </div>

              <h1
                className="text-5xl md:text-7xl mb-6"
                style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A', lineHeight: 0.9 }}
              >
                {product.name}
              </h1>

              <p
                className="text-3xl mb-8"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}
              >
                IDR {product.price?.toLocaleString('id-ID')}
              </p>

              {product.description && (
                <p className="text-base mb-8 leading-relaxed" style={{ color: '#555', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
                  {product.description}
                </p>
              )}

              {/* Sizes */}
              {product.sizes_available?.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                    Available Sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes_available.map(size => (
                      <span
                        key={size}
                        className="px-4 py-2 text-sm border"
                        style={{ borderColor: '#0A0A0A', fontFamily: 'JetBrains Mono, monospace', color: '#0A0A0A' }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider & CTA */}
            <div>
              <img
                src={DIAGONAL}
                alt=""
                aria-hidden
                className="w-full mb-6"
                style={{ opacity: 0.12, mixBlendMode: 'multiply' }}
              />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="jitter w-full flex items-center justify-center py-5 text-sm tracking-[0.3em] uppercase"
                style={{
                  background: '#0A0A0A',
                  color: '#FCFCFC',
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Inquire via WhatsApp
              </a>
              <p className="text-xs text-center mt-3" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
                DM us on Instagram for collab & wholesale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}