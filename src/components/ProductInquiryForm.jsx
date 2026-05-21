import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Menerima props 'productId' agar kita tahu produk mana yang ditanyakan
export default function ProductInquiryForm({ productId }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const { error } = await supabase
        .from('product_inquiries') // Pastikan tabel ini sudah Anda buat di Supabase
        .insert([
          {
            product_id: productId, // Mengikat pertanyaan ini dengan produk terkait
            name: form.name,
            email: form.email,
            inquiry_text: form.message,
          }
        ]);

      if (error) throw error;

      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Gagal mengirim pertanyaan:', error.message);
      alert('Gagal mengirim pertanyaan. Silakan coba lagi nanti.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-12 border-t pt-8" style={{ borderColor: '#E5E5E5' }}>
      <h3 className="text-3xl mb-6" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
        Inquire About This Product
      </h3>

      {sent ? (
        <div className="py-8 text-center border" style={{ borderColor: '#0A0A0A' }}>
          <p className="text-2xl mb-2" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>
            Inquiry Sent.
          </p>
          <p className="text-xs" style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace' }}>
            We'll get back to you with details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="YOUR NAME *"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none transition-colors focus:border-black placeholder:text-xs placeholder:tracking-widest"
              style={{ borderColor: '#DDD', fontFamily: 'JetBrains Mono, monospace' }}
            />
            <input
              type="email"
              required
              placeholder="YOUR EMAIL *"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none transition-colors focus:border-black placeholder:text-xs placeholder:tracking-widest"
              style={{ borderColor: '#DDD', fontFamily: 'JetBrains Mono, monospace' }}
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="WHAT WOULD YOU LIKE TO KNOW? *"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none resize-none transition-colors focus:border-black placeholder:text-xs placeholder:tracking-widest"
            style={{ borderColor: '#DDD', fontFamily: 'JetBrains Mono, monospace' }}
          />
          <button
            type="submit"
            disabled={isSending}
            className="jitter w-full py-4 text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
            style={{ background: '#0A0A0A', color: '#FCFCFC', fontFamily: 'JetBrains Mono, monospace', opacity: isSending ? 0.6 : 1 }}
          >
            {isSending ? 'SENDING...' : 'SUBMIT INQUIRY'}
          </button>
        </form>
      )}
    </div>
  );
}