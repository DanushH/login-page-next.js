import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
    initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,

    login: () => {
        set({ isAuthenticated: true })
        localStorage.setItem('auth', 'true')
    },

    logout: () => {
        set({ isAuthenticated: false })
        localStorage.removeItem('auth')
    },

    initialize: () => {
        const isAuth = localStorage.getItem('auth') === 'true'
        set({ isAuthenticated: isAuth })
    }

}))