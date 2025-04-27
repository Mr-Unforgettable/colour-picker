import React, { useEffect, useState } from 'react'

interface FindColorProps {
    value: string
    onColorChange: (value: string) => void
}

const FindColor: React.FC<FindColorProps> = ({ value, onColorChange }) => {
    const [input, setInput] = useState<string>(value)

    useEffect(() => {
        setInput(value)
    }, [value])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newColor = e.target.value
        setInput(newColor)
        onColorChange(newColor)
    }

    return (
        <div className='flex items-center justify-center text-center gap-2'>
            <input
                typeof='text'
                className='w-full max-w-[160px] px-3 py-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='#RRGGBB'
                value={input}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default FindColor
