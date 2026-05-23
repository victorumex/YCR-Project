import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

import LOGO from '../assets/logo_hitam.PNG';
import LOGO2 from '../assets/logo_putih.PNG';
import INK from '../assets/elemen2.PNG';
import BRUSH from '../assets/elemen3.PNG';
import DIAGONAL from '../assets/elemen4.PNG';

import FOTO_HERO from '../assets/DSC02206.jpg';
import FOTO_GAL_1 from '../assets/DSC01441.jpg';
import FOTO_GAL_2 from '../assets/DSC00967.jpg';
import FOTO_GAL_3 from '../assets/DSC02210.jpg';

const values = [
  { label: 'RAW', desc: 'Unfiltered design. No compromise, no corporate polish.' },
  { label: 'AUTHENTIC', desc: 'Every stitch tells a story from the underground.' },
  { label: 'DISRUPTIVE', desc: 'We wear our rebellion on our sleeves — literally.' },
  { label: 'CULTURE', desc: "Grunge is not a trend. It's a way of life." },
];

// Komponen efek mengetik kata per kata
const TypingText = ({ text, className, style, delayStart = 0 }) => {
  const words = text.split(" ");
  return (
    <p className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ /* tidak pakai once agar bisa berulang */ }}
          transition={{ delay: delayStart + i * 0.08, duration: 0.3 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default function About() {
  return (
    <PageTransition>
      <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
        {/* Hero dengan efek mengetik */}
        <div className="relative py-32 px-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
          <img src={INK} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.1, mixBlendMode: 'screen', filter: 'invert(1)' }} />
          <img src={LOGO2} alt="" aria-hidden className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none" style={{ opacity: 0.15, mixBlendMode: 'screen', filter: 'invert(1)' }} />
          <div className="relative z-10 max-w-7xl mx-auto">
            <TypingText 
              text="— The Story" 
              className="text-xs tracking-[0.4em] uppercase mb-3" 
              style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }} 
              delayStart={0.2}
            />
            <TypingText 
              text="ABOUT YCR" 
              className="text-7xl md:text-[10rem] leading-none" 
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }} 
              delayStart={0.6}
            />
          </div>
        </div>

        {/* Born from the streets + gambar */}
        <section className="relative py-24 px-6 overflow-hidden">
          <img src={INK} alt="" aria-hidden className="absolute top-0 right-0 w-96 pointer-events-none" style={{ opacity: 0.05, mixBlendMode: 'multiply' }} />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img src={BRUSH} alt="" aria-hidden className="w-48 mb-8" style={{ opacity: 0.15, mixBlendMode: 'multiply' }} />
              <h2 className="text-5xl md:text-7xl mb-10" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
                Born from the streets.
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: '#333', fontFamily: 'Inter, sans-serif', lineHeight: 1.9 }}>
                <p>YCR wasn't designed in a boardroom. It was born in garages, on rooftops, in the spaces between the cracks of the city. We started with nothing but a spray can, a vision, and the relentless drive to create something that felt real.</p>
                <p>The fashion industry promised polish. We chose grit. Every collection we drop carries the weight of the streets, the texture of concrete, and the energy of a subculture that refuses to be tamed.</p>
                <p>Our garments are not just clothing — they're artifacts. Evidence that you were here, that you refused to blend in, that you chose to wear your identity with unapologetic force.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md mx-auto md:ml-auto mt-10 md:mt-0"
            >
              <div className="aspect-[2/3] w-full overflow-hidden" style={{ background: '#E5E5E5' }}>
                <img 
                  src={FOTO_HERO} 
                  alt="YCR Attitude" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: 'grayscale(15%) contrast(1.1)' }} 
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Editorial Gallery dengan animasi urut (tengah dulu, kiri, kanan) */}
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E5E5E5]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {/* FOTO KIRI (muncul kedua) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-0 md:mt-12"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img src={FOTO_GAL_1} alt="YCR Editorial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
              </div>
            </motion.div>
            {/* FOTO TENGAH (muncul pertama) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img src={FOTO_GAL_2} alt="YCR Editorial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
              </div>
            </motion.div>
            {/* FOTO KANAN (muncul ketiga) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden md:block mt-24"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img src={FOTO_GAL_3} alt="YCR Editorial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values (fade-up satu per satu) */}
        <div className="relative py-24 px-6" style={{ background: '#F2F2F2' }}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ /* tanpa once */ }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl mb-16"
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}
            >
              Our Code
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: '1px solid #DDD' }}>
              {values.map(({ label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ /* tanpa once */ }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-10 relative group"
                  style={{ background: '#FCFCFC', borderRight: '1px solid #DDD', borderBottom: '1px solid #DDD' }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  <h3 className="text-5xl mb-4" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>{label}</h3>
                  <p className="text-base" style={{ color: '#555', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-24 px-6 overflow-hidden text-center" style={{ background: '#0A0A0A' }}>
          <img src={INK} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.06, mixBlendMode: 'screen', filter: 'invert(1)' }} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ /* tanpa once */ }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <img src={LOGO} alt="YCR" className="h-16 mx-auto mb-8" style={{ filter: 'invert(1)' }} />
            <p className="text-base mb-10" style={{ color: '#888', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
              Ready to wear the movement?
            </p>
            <Link
              to="/collection"
              className="jitter inline-block px-12 py-4 tracking-widest uppercase text-sm"
              style={{ background: '#FCFCFC', color: '#0A0A0A', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Shop the Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}