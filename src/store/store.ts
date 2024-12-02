import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Tenant {
    name: string;
    address: string;
}
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tenant?: Tenant
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void;
}

//create zustand store for user
export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        setUser: (user: User) => set({ user }),
        removeUser: () => set({ user: null }),
    }))
)