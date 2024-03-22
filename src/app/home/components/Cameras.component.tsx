import { useCameraStore } from "../../../utils/stores/CameraStore";
import CameraComponent from "./Camera.component";
import CameraMaskComponent from "./CameraMask.component";


export default function CamerasComponent() {
    const deviceSelected = useCameraStore(state => state.deviceSelected)

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 place-content-center md:px-14">
            <div className="relative flex flex-col items-center justify-center bg-slate-100 shadow-md rounded-md">
                <div className="absolute font-bold text-xl top-5 left-5">
                    <span>{deviceSelected.name}</span>
                </div>
                <CameraComponent />
            </div>
            <div className="relative flex flex-col items-center justify-center bg-slate-100 shadow-md rounded-md">
                <div className="absolute font-bold text-xl top-5 left-5">
                    <span>Verificación de rostro</span>
                </div>
                <CameraMaskComponent />
            </div>
        </section>
    )
}