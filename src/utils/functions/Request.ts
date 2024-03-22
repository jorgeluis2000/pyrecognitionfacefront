

export type OptionColor = 'light' | 'dark'

interface IChangeColor {
    ok: boolean
    message: string
    color?: string
    color_hsv?: string
    error?: string
}

interface IGetCurrentColor {
    ok: boolean
    message: string
    color?: string
    color_hsv?: string
    error?: string
}

interface ResultRecognitionRespose {
    ok: boolean
    http_code: number
    message: string
    data: {
        result: Array<Array<number>>
        names: { [name: string]: string }
    }
}

export async function getCaptureRecognition() {
    try {
        const response = await fetch('http://localhost:5555/capture_recognition')
        const myImage = await response.blob()
        return myImage
    } catch (error) {
        console.log("❌ System Error Function ~ getCaptureRecognition():", error)
        return null
    }

}

export async function getResultRecognition(): Promise<ResultRecognitionRespose> {

    try {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const request = await fetch('http://localhost:5555/result_recognition',
            {
                method: 'GET',
                headers: myHeaders
            })
        const response = await request.json()
        return response
    } catch (error) {
        console.log("❌ System Error Function ~ getResultRecognition():", error)
        return {
            ok: false,
            http_code: 4000,
            message: "Lo sentimos, no pudimos tomar la foto.",
            data: {
                result: [[]],
                names: {}
            }
        }
    }

}

export async function changeColor(hex: string, option: OptionColor): Promise<IChangeColor> {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const data = {
        option,
        color: hex
    }
    const request = await fetch('http://localhost:5555/change_color', {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders
    })

    return await request.json()
}

export async function getCurrentColor(option: OptionColor): Promise<IGetCurrentColor> {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const data = {
        option
    }
    const request = await fetch('http://localhost:5555/current_color', {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders
    })

    return await request.json()
}