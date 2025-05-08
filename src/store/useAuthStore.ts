import { create } from 'zustand';
import CryptoJS from 'crypto-js';

// Definimos la interfaz para el estado de autenticación
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

// Definimos la clave secreta para la encriptación
const secretKey = 'my-secret-key';

// Función para obtener el usuario desencriptado
const getDecryptedUser = () => {
  const data = sessionStorage.getItem('auth');
  if (!data) return null;
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Guardamos la hora de login en el sessionStorage
export const useAuthStore = create<AuthState>((set) => ({
  
  // Inicializamos el estado de autenticación
  isAuthenticated: !!sessionStorage.getItem('auth'),
  
  // Obtenemos el usuario desencriptado al cargar la aplicación
  user: getDecryptedUser(),
  
  // Función para iniciar sesión
  login: (email) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(email), secretKey).toString();
    sessionStorage.setItem('auth', encrypted);
    sessionStorage.setItem('authTime', JSON.stringify(Date.now())); // Guardamos hora de login
    set({ isAuthenticated: true, user: email });
  },
  
  // Función para cerrar sesión
  logout: () => {
    console.log('Cerrando sesión...');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('authTime');
    set({ isAuthenticated: false, user: null });
  }
  
}));
