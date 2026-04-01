import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  // --- Data ---
  clientes: any[];
  casos: any[];
  prospectos: any[];
  citas: any[];
  teamMembers: any[];
  notifications: any[];
  
  // --- UI States (Global) ---
  subscriptionLevel: 'free' | 'pro' | 'enterprise';
  premiumUsage: number;
  theme: 'dark' | 'light';
  language: 'es' | 'en';
  
  // --- Actions ---
  setClientes: (clientes: any[]) => void;
  setCasos: (casos: any[]) => void;
  setProspectos: (prospectos: any[]) => void;
  setCitas: (citas: any[]) => void;
  setTeamMembers: (members: any[]) => void;
  addNotification: (notification: any) => void;
  setSubscription: (level: 'free' | 'pro' | 'enterprise') => void;
  incPremiumUsage: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: 'es' | 'en') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // --- Initial State ---
      clientes: [],
      casos: [],
      prospectos: [],
      citas: [],
      teamMembers: [],
      notifications: [],
      
      subscriptionLevel: 'free',
      premiumUsage: 0,
      theme: 'dark',
      language: 'es',

      // --- Actions ---
      setClientes: (clientes) => set({ clientes }),
      setCasos: (casos) => set({ casos }),
      setProspectos: (prospectos) => set({ prospectos }),
      setCitas: (citas) => set({ citas }),
      setTeamMembers: (teamMembers) => set({ teamMembers }),
      
      addNotification: (notification) => set((state) => ({ 
        notifications: [notification, ...state.notifications].slice(0, 50) 
      })),
      
      setSubscription: (subscriptionLevel) => set({ subscriptionLevel }),
      incPremiumUsage: () => set((state) => ({ premiumUsage: state.premiumUsage + 1 })),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
      
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'tuabogadoia-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
