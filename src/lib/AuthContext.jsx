import { createContext, useContext } from 'react';

// Membuat Context kosong agar aplikasi tidak error saat mencarinya
const AuthContext = createContext({
  user: null,
  isLoading: false,
});

export const AuthProvider = ({ children }) => {
  // Hanya me-return komponen anak-anaknya tanpa melakukan pengecekan login apapun
  return (
    <AuthContext.Provider value={{ user: null, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);