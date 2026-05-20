import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Setiap kali 'pathname' (URL halaman) berubah, paksa scroll ke paling atas
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Komponen ini tidak menampilkan apa-apa secara visual
  return null; 
}