import { ReactNode, } from 'react'


interface VerifyPersonProps {
    children?: ReactNode
    verified: boolean
    firstTime: boolean
}

export default function VerifyPersonComponent({ verified, firstTime }: VerifyPersonProps) {

    return (
        <div className='px-2'>
            <img className='transition-all duration-300 w-14 h-auto hover:scale-110' src={!firstTime ? verified ? '/assets/svgs/SuccessRecognitionIcon.svg' : '/assets/svgs/ErrorRecognitionIcon.svg' : '/assets/svgs/RecognitionWaitIcon.svg'} alt='Verifiación de persona correcta'/>
        </div>
    )
}

