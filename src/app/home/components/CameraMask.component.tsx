import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useCameraStore } from '../../../utils/stores/CameraStore'
import VerifyPersonComponent from '../modules/VerifyPersonComponent'
import { getCaptureRecognition, getResultRecognition } from '../../../utils/functions/Request'


export default function CameraMaskComponent() {
    const imgRef = useRef<HTMLImageElement>(null)
    const [verified, setVerified] = useState(false)
    const [firstTime, setfirstTime] = useState(true)
    const updateMask = useCameraStore(state => state.updateMask)


    async function handleCaptureImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        const idToast = toast.loading("Sonríe estamos tomando te una foto...")
        try {
            const imgElement = imgRef.current
            if (imgElement) {
                const myRecognitionImg = await getCaptureRecognition()
                if (myRecognitionImg) {
                    updateMask(imgElement)
                    setfirstTime(false)
                    imgElement.src = 'http://localhost:5555/capture_recognition'
                    const resultado = await getResultRecognition()
                    if (resultado.ok) {
                        const namesArray = Object.values(resultado.data.names);
                        const noRegistrado = namesArray.length - 1
                        const resultadoDetection = resultado.data.result[0]
                        const personRegister = resultadoDetection.filter(person => person !== noRegistrado)
                        setVerified(personRegister.length > 0)
                        toast.update(idToast, {
                            type: 'success',
                            render: "!Se ha tomado la foto correctamente!",
                            isLoading: false,
                            closeOnClick: true,
                            closeButton: true
                        })
                    } else {
                        setVerified(false)
                        toast.update(idToast, {
                            type: 'error',
                            render: "Lo sentimos, ha sucedido un problema al validar tu rostro.",
                            isLoading: false,
                            closeOnClick: true,
                            closeButton: true
                        })
                    }
                } else {
                    toast.update(idToast, {
                        type: 'error',
                        render: "Lo sentimos, ha sucedido un problema al tomarte la foto.",
                        isLoading: false,
                        closeOnClick: true,
                        closeButton: true
                    })
                }
            }
        } catch (error) {
            console.log("🚀 ~ file: CameraMask.component.tsx:49 ~ handleCaptureImage ~ error:", error)
            setVerified(false)
            toast.update(idToast, {
                type: 'error',
                render: "Lo sentimos, ha sucedido un problema al validar tu rostro.",
                isLoading: false,
                closeOnClick: true,
                closeButton: true
            })
        }

    }

    useEffect(() => {
        const imgElement = imgRef.current
        if (imgElement) {
            imgElement.src = `/assets/imgs/defaultFaceRecognition.gif`
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center space-y-4 px-5 py-10 pt-24'>
            <button type='button' className='flex transition-all items-center duration-300 border-2 border-green-200 text-sm font-semibold px-5 p-2 rounded-md shadow-lg hover:scale-110 hover:text-green-700 hover:border-green-600 active:scale-95 active:border-green-500' onClick={handleCaptureImage}>
                <img src="/assets/svgs/FaceDetectionIcon.svg" className='w-8 h-8 mx-2' alt="Icono de captura" />
                <span>Verificar rostro</span>
            </button>
            <img ref={imgRef} className='rounded-md' alt="Camera feed mask" />
            <VerifyPersonComponent firstTime={firstTime} verified={verified} />
        </div>
    )
}