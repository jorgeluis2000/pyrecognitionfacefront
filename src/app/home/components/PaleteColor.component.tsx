import { useState, ReactNode, useEffect } from 'react'
import reactCSS from 'reactcss'
import { ChromePicker, ColorResult, SliderPicker } from "react-color"
import { changeColor, getCurrentColor, OptionColor } from '../../../utils/functions/Request'


interface PaleteColorProps {
    children?: ReactNode
    type_color: OptionColor
}

export default function PaleteColorComponent({ type_color }: PaleteColorProps) {
    const [colorSelect, setColorSelect] = useState<string>('#ffff')
    const [displayColor, setDisplayColor] = useState<boolean>(false)

    function handleClick() {
        setDisplayColor(!displayColor)
    }

    async function handleChangeComplete(color: ColorResult) {
        setColorSelect(color.hex)
        const responseColor = await changeColor(color.hex, type_color)
        if (responseColor.ok) {
            console.log("🚀 Se a realizado la transación", responseColor)
        } else if (responseColor.error) {
            console.log(responseColor.message, responseColor.error)
        }
    }

    useEffect(() => {
        async function getColor() {
            const currentColor = await getCurrentColor(type_color)
            if (currentColor.ok && currentColor.color) {
                console.log("🚀 Se a realizado la transación", currentColor)
                setColorSelect(currentColor.color)
            } else if (currentColor.error) {
                console.log(currentColor.message, currentColor.error)
            }
        }
        getColor()
    }, [type_color])

    const styles = reactCSS({
        'default': {
            color: {
                color: '#fff',
                background: `${colorSelect}`,
            }
        }
    })

    return (
        <div className='px-2'>
            <div onClick={handleClick} className="flex transition-all duration-300 justify-center items-center w-full h-16 rounded-md cursor-pointer hover:shadow-md active:shadow-xl border" style={styles.color}>{colorSelect}</div>
            <div className={`absolute ${(!displayColor) ? 'hidden' : 'block'} -mt-36 z-10`}>
                <ChromePicker
                    color={colorSelect}
                    onChangeComplete={handleChangeComplete}
                />
            </div>
            <div className='w-full pt-10'>

            </div>
            <SliderPicker
                color={colorSelect}
                onChangeComplete={handleChangeComplete}
            />
        </div>
    )
}

