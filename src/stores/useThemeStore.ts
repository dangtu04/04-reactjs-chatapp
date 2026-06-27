import type { ThemeState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            darkMode: true,
            toggleTheme: () => {
                const newValue = !get().darkMode;

                set({ darkMode: newValue })

                if (newValue) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
            },
            setTheme: (dark: boolean) => {
                set({ darkMode: dark })
                if (dark) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
            }
        }),
        {
            name: 'theme-storage'
        }
    )
)