import React from 'react'

interface ColorDetailsProps {
    name: string
    hex: string
    hsl: { h: number; s: number; l: number }
    hsv: { h: number; s: number; v: number }
    rgb: { r: number; g: number; b: number }
    alpha: number
}

const ColorDetails: React.FC<ColorDetailsProps> = ({
    name,
    hex,
    hsl,
    hsv,
    rgb,
    alpha,
}) => {
    return (
        <div className='space-y-1 text-left'>
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>HEX:</strong> {hex}
            </p>
            <p>
                <strong>HSL:</strong>{' '}
                {hsl.s === 0 ? 'Hue: N/A' : `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`}
            </p>
            <p>
                <strong>HSV:</strong> {Math.round(hsv.s * 100) === 0
                    ? 'Hue: N/A'
                    : `${Math.round(hsv.h)}°, ${Math.round(hsv.s * 100)}%, ${
                        Math.round(
                            hsv.v * 100,
                        )
                    }%`}
            </p>
            <p>
                <strong>RGBA:</strong> rgba({rgb.r}, {rgb.g}, {rgb.b},{' '}
                {alpha.toFixed(2)})
            </p>
        </div>
    )
}

export default ColorDetails
