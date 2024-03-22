import { useEffect, useRef, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { useCameraStore } from '../../../utils/stores/CameraStore'

interface ResponseOptionChange {
    ok: boolean
    message: string
}

export default function CameraComponent() {
    const imgRef = useRef<HTMLImageElement>(null)
    const updateFrame = useCameraStore(state => state.updateFrame)
    const updateDeviceSelected = useCameraStore(state => state.updateDeviceSelected)
    const listDevices = useCameraStore(state => state.listDevices)
    const deviceSelected = useCameraStore(state => state.deviceSelected)

    useEffect(() => {
        const imgElement = imgRef.current

        if (imgElement) {
            const updateImage = () => {
                // imgElement.src = `http://localhost:5555/video_feed?timestamp=${Date.now()}`
                updateFrame(imgElement)
                imgElement.src = `http://localhost:5555/video_feed`
            }

            const interval = setInterval(updateImage, 100)

            return () => {
                clearInterval(interval);
            }
        }
    })

    async function handlerChangeOption(event: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = event.target.value;
        const idToast = toast.loading("Cambiando de camara, espere unos momentos...")
        const response = await fetch(`http://localhost:5555/video_option/${selectedValue}`)
        const responsejson: ResponseOptionChange = await response.json()
        console.log("🚀 ~ file: Camera.component.tsx:41 ~ handlerChangeOption ~ selectedValue:", selectedValue)
        console.log('Device selected', deviceSelected);
        if (responsejson?.ok) {
            toast.update(idToast, {
                type: 'success',
                render: "¡Se ha cambiado la camara!",
                isLoading: false,
                closeOnClick: true,
                closeButton: true
            })
            const itemFound = listDevices.find((x) => x.index === Number(selectedValue))
            updateDeviceSelected({ name: (itemFound !== undefined) ? itemFound.name : "Default", index: Number((itemFound !== undefined) ? itemFound.index : selectedValue) })
        } else {
            toast.update(idToast, {
                type: 'error',
                render: "Lo sentimos, esa camara no esta disponible.",
                isLoading: false,
                closeOnClick: true,
                closeButton: true
            })
        }
    }

    return (
        <div className='space-y-4 px-5 py-10 pt-14'>
            <select className='w-full rounded-md outline-none select-text active:ring-0 py-3 px-2' id='select-divece' name='device' value={deviceSelected.index} onChange={handlerChangeOption}>
                <option value={0} >0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <img ref={imgRef} alt="Camera Feed" />
        </div>
    )
}
