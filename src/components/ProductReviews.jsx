import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Ambil data ulasan dari Supabase
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (!error && data) setReviews(data);
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  // 2. Kirim Ulasan Baru
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from('product_reviews')
      .insert([
        {
          product_id: productId,
          name: form.name,
          rating: form.rating,
          comment: form.comment,
        },
      ]);

    setIsSubmitting(false);

    if (!error) {
      setForm({ name: '', comment: '', rating: 5 });
      fetchReviews(); // Refresh daftar komentar
    } else {
      alert('Gagal mengirim ulasan');
    }
  };

  return (
    <div className="mt-24 border-t pt-12" style={{ borderColor: '#E5E5E5' }}>
      <h3 className="text-4xl mb-8" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>Reviews & Ratings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Sisi Kiri: Daftar Komentar */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-sm italic" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>No reviews yet. Be the first to drop yours.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="pb-6 border-b" style={{ borderColor: '#F2F2F2' }}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{rev.name}</p>
                  <p className="text-yellow-5xl text-sm">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </p>
                </div>
                <p className="text-sm" style={{ color: '#555', fontFamily: 'Inter, sans-serif' }}>{rev.comment}</p>
                <span className="text-[10px] mt-1 block" style={{ color: '#AAA', fontFamily: 'JetBrains Mono, monospace' }}>
                  {new Date(rev.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Sisi Kanan: Form Isi Review */}
        <div>
          <h4 className="text-xl mb-4 uppercase tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Leave a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="YOUR NAME *"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none focus:border-black"
                style={{ borderColor: '#DDD', fontFamily: 'Inter, sans-serif' }}
              />
              <div className="flex flex-col justify-end">
                <label className="text-[10px] tracking-widest text-gray-400 font-mono mb-1">RATING *</label>
                <select
                  value={form.rating}
                  onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))}
                  className="bg-transparent border-b-2 border-gray-200 py-2 text-sm outline-none focus:border-black font-mono"
                >
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n} value={n}>{'★'.repeat(n)} ({n}/5)</option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              placeholder="YOUR REVIEW *"
              required
              rows={3}
              value={form.comment}
              onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none resize-none focus:border-black"
              style={{ borderColor: '#DDD', fontFamily: 'Inter, sans-serif' }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
              style={{ background: '#0A0A0A', color: '#FCFCFC', fontFamily: 'JetBrains Mono, monospace', opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting ? 'SUBMITTING...' : 'POST REVIEW'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}