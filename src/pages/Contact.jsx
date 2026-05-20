import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Menggunakan Supabase
import { GrungeCorner } from '@/components/GrungeSection';

// Memperbaiki path gambar menggunakan import bawaan Vite
import INK from "../assets/elemen2.PNG";
import DIAGONAL from "../assets/elemen4.PNG";
import BRUSH from "../assets/elemen3.PNG";

const socials = [
  { label: 'Instagram', handle: '@ycr.official_', href: 'https://instagram.com', desc: 'Drops, editorials & culture' },
  { label: 'WhatsApp', handle: 'Order & Inquiries', href: 'https://wa.me/6285932215911', desc: 'Direct order & wholesale' },
  { label: 'TikTok', handle: '@ycr', href: 'https://tiktok.com', desc: 'Behind the scenes & lookbooks' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false); // Mengganti status isPending dari useMutation

  // Mengubah logika handleSubmit untuk mengirim data ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }
        ]);

      if (error) throw error;

      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Gagal mengirim pesan:', error.message);
      alert('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div className="relative py-24 px-6 overflow-hidden" style={{ background: '#F2F2F2' }}>
        <GrungeCorner className="absolute top-0 left-0 w-72 h-72" opacity={0.15} />
        <img src={INK} alt="" aria-hidden className="absolute right-0 bottom-0 w-80 pointer-events-none" style={{ opacity: 0.07, mixBlendMode: 'multiply' }} />
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
            — Get in Touch
          </p>
          <h1 className="text-7xl md:text-9xl" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A', lineHeight: 0.85 }}>
            Contact
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Socials */}
          <div>
            <img src={BRUSH} alt="" aria-hidden className="w-32 mb-8" style={{ opacity: 0.12, mixBlendMode: 'multiply' }} />
            <h2 className="text-5xl mb-12" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
              Find Us
            </h2>
            <div className="space-y-0">
              {socials.map(({ label, handle, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between py-8 group transition-all hover:pl-4"
                  style={{ borderBottom: '1px solid #E5E5E5' }}
                >
                  <div>
                    <p className="text-3xl group-hover:underline" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
                      {label}
                    </p>
                    <p className="text-sm mt-1" style={{ color: '#555', fontFamily: 'Inter, sans-serif' }}>
                      {desc}
                    </p>
                  </div>
                  <span className="text-sm tracking-widest mt-2 transition-transform group-hover:translate-x-2" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                    {handle} →
                  </span>
                </a>
              ))}
            </div>

            <img src={DIAGONAL} alt="" aria-hidden className="w-full mt-12" style={{ opacity: 0.08, mixBlendMode: 'multiply' }} />
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-5xl mb-12" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
              Send a Message
            </h2>

            {sent ? (
              <div className="py-16 text-center border" style={{ borderColor: '#0A0A0A' }}>
                <p className="text-5xl mb-4" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
                  Message Sent.
                </p>
                <p className="text-sm" style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace' }}>
                  We'll get back to you. Stay raw.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { key: 'name', label: 'Name', type: 'text', required: true },
                  { key: 'email', label: 'Email', type: 'email', required: true },
                  { key: 'subject', label: 'Subject', type: 'text', required: false },
                ].map(({ key, label, type, required }) => (
                  <div key={key}>
                    <label className="block text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                      {label} {required && '*'}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none transition-colors focus:border-black"
                      style={{
                        borderColor: '#DDD',
                        fontFamily: 'Inter, sans-serif',
                        color: '#0A0A0A',
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 text-sm bg-transparent border-b-2 outline-none resize-none transition-colors focus:border-black"
                    style={{
                      borderColor: '#DDD',
                      fontFamily: 'Inter, sans-serif',
                      color: '#0A0A0A',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="jitter w-full py-5 text-sm tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
                  style={{
                    background: '#0A0A0A',
                    color: '#FCFCFC',
                    fontFamily: 'JetBrains Mono, monospace',
                    opacity: isSending ? 0.6 : 1,
                  }}
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}