import React from 'react'

interface EyeDropperProps {
    onSelect: () => void
}

const EyeDropper: React.FC<EyeDropperProps> = ({ onSelect }) => {
    return (
        <button
            type='button'
            onClick={onSelect}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg'
        >
            <span role='img' aria-label='eyedropper'>🎨</span> Pick a Color
        </button>
    )
}

export default EyeDropper
