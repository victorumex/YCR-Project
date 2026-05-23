import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

import LOGO from '../assets/logo_hitam.PNG';
import LOGO2 from '../assets/logo_putih.PNG';
import INK from '../assets/elemen2.PNG';
import BRUSH from '../assets/elemen3.PNG';

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

// --- Definisi Kurva Animasi "Snap/Edgy" ---
const snapTransition = {
  duration: 0.6,
  ease: [0.19, 1, 0.22, 1], // easeOutExpo
};

// =========================
// BLINKING CURSOR
// =========================
const BlinkingCursor = ({ active = true }) => {
  if (!active) return null;

  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className="inline-block ml-[2px]"
      style={{ fontFamily: 'JetBrains Mono, monospace' }}
    >
      |
    </motion.span>
  );
};

// =========================
// TYPEWRITER TITLE
// =========================
const TypingText = ({ text, className, style, speed = 40, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <p className={className} style={style}>
      {displayedText}
      <BlinkingCursor active={!typingDone} />
    </p>
  );
};

// =========================
// TYPEWRITER PARAGRAPH
// =========================
const TypingParagraphs = ({ paragraphs, className, style, typingSpeed = 12, startDelay = 400 }) => {
  const fullText = useMemo(() => {
    return paragraphs.join('\n\n');
  }, [paragraphs]);

  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [fullText, typingSpeed, startDelay]);

  return (
    <div
      className={className}
      style={{
        ...style,
        whiteSpace: 'pre-line',
        minHeight: '420px', // Mencegah layout bergeser saat teks mengetik
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <span>
        {displayedText}
        <BlinkingCursor active={!typingDone} />
      </span>
    </div>
  );
};

export default function About() {
  return (
    <PageTransition>
      <div style={{ background: '#FCFCFC', minHeight: '100vh', paddingTop: '64px' }}>
        
        {/* HERO SECTION (LATAR HITAM, SEJAJAR KIRI) */}
        <div className="relative py-32 px-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
          <img
            src={INK}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.1, mixBlendMode: 'screen', filter: 'invert(1)' }}
          />

          <img
            src={LOGO2}
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
            style={{ opacity: 0.15, mixBlendMode: 'screen', filter: 'invert(1)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <TypingText
              text="— The Story"
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace' }}
              speed={35}
              delay={200}
            />

            <TypingText
              text="ABOUT YCR"
              className="text-7xl md:text-[10rem] leading-none"
              style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#FCFCFC' }}
              speed={55}
              delay={900}
            />
          </div>
        </div>

        {/* STORY SECTION: BORN FROM THE STREETS (TEKS KIRI, GAMBAR KANAN) */}
        <section className="relative py-24 px-6 overflow-hidden">
          <img
            src={INK}
            alt=""
            aria-hidden
            className="absolute top-0 right-0 w-96 pointer-events-none"
            style={{ opacity: 0.05, mixBlendMode: 'multiply' }}
          />

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE (TEKS) */}
            <div>
              <img src={BRUSH} alt="" aria-hidden className="w-48 mb-8" style={{ opacity: 0.15, mixBlendMode: 'multiply' }} />

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={snapTransition}
                className="text-5xl md:text-7xl mb-10"
                style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}
              >
                Born from the streets.
              </motion.h2>

              <TypingParagraphs
                paragraphs={[
                  "YCR wasn't designed in a boardroom. It was born in garages, on rooftops, in the spaces between the cracks of the city. We started with nothing but a spray can, a vision, and the relentless drive to create something that felt real.",
                  "The fashion industry promised polish. We chose grit. Every collection we drop carries the weight of the streets, the texture of concrete, and the energy of a subculture that refuses to be tamed.",
                  "Our garments are not just clothing — they're artifacts. Evidence that you were here, that you refused to blend in, that you chose to wear your identity with unapologetic force.",
                ]}
                className="text-base leading-relaxed"
                style={{ color: '#333', fontFamily: 'Inter, sans-serif', lineHeight: 1.9 }}
                typingSpeed={12}
                startDelay={400}
              />
            </div>

            {/* RIGHT SIDE (GAMBAR ORANG) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ...snapTransition, delay: 0.2 }}
              className="relative w-full"
            >
              <div className="aspect-[2/3] w-full max-w-md mx-auto md:ml-auto overflow-hidden" style={{ background: '#E5E5E5' }}>
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

        {/* GALLERY (3 GAMBAR) */}
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E5E5E5]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...snapTransition, delay: 0.3 }}
              className="mt-0 md:mt-12"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={FOTO_GAL_1}
                  alt="YCR Editorial"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...snapTransition, delay: 0.1 }}
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={FOTO_GAL_2}
                  alt="YCR Editorial"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...snapTransition, delay: 0.5 }}
              className="hidden md:block mt-24"
            >
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={FOTO_GAL_3}
                  alt="YCR Editorial"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* VALUES / OUR CODE */}
        <div className="relative py-24 px-6" style={{ background: '#F2F2F2' }}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={snapTransition}
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
                  viewport={{ once: true }}
                  transition={{ ...snapTransition, delay: i * 0.08 }}
                  className="p-10 relative group"
                  style={{ background: '#FCFCFC', borderRight: '1px solid #DDD', borderBottom: '1px solid #DDD' }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  <h3 className="text-5xl mb-4" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', color: '#0A0A0A' }}>
                    {label}
                  </h3>
                  <p className="text-base" style={{ color: '#555', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="relative py-24 px-6 overflow-hidden text-center" style={{ background: '#0A0A0A' }}>
          <img
            src={INK}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.06, mixBlendMode: 'screen', filter: 'invert(1)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={snapTransition}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <img src={LOGO} alt="YCR" className="h-16 mx-auto mb-8" style={{ filter: 'invert(1)' }} />

            <p className="text-base mb-10" style={{ color: '#888', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>
              Ready to wear the movement?
            </p>

            <Link
              to="/collection"
              className="px-10 py-4 text-base tracking-widest uppercase transition-all duration-300"
              style={{
                backgroundColor: '#FCFCFC',
                color: '#0A0A0A',
                border: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E5E5E5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FCFCFC';
              }}
            >
              Shop the Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}