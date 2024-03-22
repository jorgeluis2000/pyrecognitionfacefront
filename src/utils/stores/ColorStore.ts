import { create } from "zustand"

interface ColorStoreState {
    colorLight: string
    changeColor: (newColor: string) => void
}


export const useCameraStore = create<ColorStoreState>( (set) => ({
    colorLight: '',
    changeColor: (newColor: string) => set({ colorLight: newColor })
}))