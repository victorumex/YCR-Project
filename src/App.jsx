import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Komponen Halaman
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Collection from '@/pages/Collection';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PageNotFound from './lib/PageNotFound';

function App() {
  return (
    // Kita hapus AuthProvider dan QueryClient karena sudah tidak dipakai
    <Router>
      <ScrollToTop />
      
      <Routes>
        {/* Semua halaman yang menggunakan Layout (ada Navbar & Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Halaman 404 jika URL tidak ditemukan */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      
      <Toaster />
    </Router>
  );
}

export default App;