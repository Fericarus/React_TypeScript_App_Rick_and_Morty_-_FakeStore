import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

// Definimos el tiempo de inactividad en milisegundos (5 minutos)
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutos
// const INACTIVITY_LIMIT = 5000; // 5 segundo para pruebas

export const useAutoLogout = () => {

  // Obtenemos el estado de autenticación y la función de logout del store
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log('Autenticado, iniciando temporizador de inactividad...');

    const checkLastInteraction = () => {

      // Obtenemos el tiempo de autenticación desde el sessionStorage
      const authTime = sessionStorage.getItem('authTime');
      if (!authTime) return logout();

      // Convertimos el tiempo de autenticación a un número
      const loginTime = JSON.parse(authTime);
      const now = Date.now();

      // Comprobamos si ha pasado el tiempo de inactividad
      if (now - loginTime >= INACTIVITY_LIMIT) {
        logout();
      }
    };

    // Reseteamos el temporizador cada vez que hay interacción del usuario
    const resetTimer = () => {
      sessionStorage.setItem('authTime', JSON.stringify(Date.now()));
    };

    // Añadimos los eventos de interacción del usuario
    const events = ['mousemove', 'keydown'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    const interval = setInterval(checkLastInteraction, 10 * 1000); // Chequea cada 10s

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [isAuthenticated, logout]);
};
