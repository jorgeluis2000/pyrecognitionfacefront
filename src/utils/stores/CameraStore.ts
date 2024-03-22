import { create } from "zustand"

interface IDevice {
    index: number
    name: string
}

interface CameraStoreState {
    deviceSelected: IDevice
    listDevices: IDevice[]
    frame: HTMLImageElement | null
    mask: HTMLImageElement | null
    updateDeviceSelected: (newDevice: IDevice) => void
    updateListDevices: (newListDevices: IDevice[]) => void
    addDevice: (newDevice: IDevice) => void
    updateFrame: (elementIMG: HTMLImageElement) => void
    updateMask: (elementIMG: HTMLImageElement) => void
}

export const useCameraStore = create<CameraStoreState>( (set) => ({
    deviceSelected: { index: 0, name: "Camera 0" },
    frame: null,
    mask: null,
    listDevices: [
        { index: 0, name: 'Camera 0' },
        { index: 1, name: 'Camera 1' },
        { index: 2, name: 'Camera 2' }
    ],
    updateDeviceSelected: (newDevice) => set({ deviceSelected: newDevice }),
    updateFrame: (elementIMG: HTMLImageElement) => set({ frame: elementIMG }),
    updateMask: (elementIMG: HTMLImageElement) => set({ mask: elementIMG }),
    updateListDevices: (newListDevices: IDevice[]) => set({ listDevices: newListDevices }),
    addDevice: (newDevice: IDevice) => set(state => ({ listDevices: [...state.listDevices, newDevice] }))
}))