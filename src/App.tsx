import React from 'react'
import FindColor from './components/FindColor.tsx'
import useColorState from './hooks/useColorState.ts'
import ColorSquarePicker from './components/ColorSquarePicker.tsx'
import HueSlider from './components/HueSlider.tsx'
import EyeDropper from './components/EyeDropper.tsx'
import AlphaSlider from './components/AlphaSlider.tsx'
import ColorPreview from './components/ColorPreview.tsx'
import ColorDetails from './components/ColorDetails.tsx'
import './globals.css'

const App: React.FC = () => {
    const {
        hsv: { hue, setHue, saturation, setSaturation, value, setValue },
        alphaState: { alpha, setAlpha },
        computed: { rgb, hsl, hex, name },
        inputHex,
        handleColorChange,
    } = useColorState()

    const handleEyeDropper = async () => {
        if (!('EyeDropper' in window)) {
            alert('Your browser does not support the EyeDropper API')
            return
        }

        try {
            /* @ts-ignore */
            const eyeDropper = new globalThis.EyeDropper()
            const result = await eyeDropper.open()
            const pickedHex = result.sRGBHex

            handleColorChange(pickedHex)
        } catch (error) {
            console.error('EyeDropper failed:', error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-400 p-6 rounded-lg w-full max-w-md space-y-6'>
                <h2 className='text-xl text-center font-bold'>
                    🎨 Color Picker
                </h2>

                <div className='flex gap-10'>
                    {/* Color Picker */}
                    <ColorSquarePicker
                        hue={hue}
                        saturation={saturation}
                        value={value}
                        setSaturation={setSaturation}
                        setValue={setValue}
                        hex={hex}
                    />

                    {/* Sliders: Hue and Alpha */}
                    <div className='flex flex-row gap-8'>
                        <HueSlider hue={hue} setHue={setHue} />
                        <AlphaSlider
                            alpha={alpha}
                            setAlpha={setAlpha}
                            rgb={rgb}
                        />
                    </div>
                </div>

                {/* Preview + Color Details */}
                <div className='flex flex-col md:flex-row gap-6 mt-6'>
                    {/* Left: Color Preview + Input */}
                    <div className='flex flex-col items-center gap-4'>
                        <ColorPreview rgb={rgb} alpha={alpha} />
                        <FindColor
                            value={inputHex}
                            onColorChange={handleColorChange}
                        />
                    </div>

                    {/* Right: Color Details */}
                    <div className='space-y-1 text-left'>
                        <ColorDetails
                            name={name}
                            hex={hex}
                            hsl={hsl}
                            hsv={{ h: hue, s: saturation, v: value }}
                            rgb={rgb}
                            alpha={alpha}
                        />
                    </div>
                </div>

                {/* Eydropper Button */}
                <div className='flex justify-center mt-6'>
                    <EyeDropper onSelect={handleEyeDropper} />
                </div>
            </div>
        </div>
    )
}

export default App
