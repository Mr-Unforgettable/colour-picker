import React, { useCallback } from 'react'

const useDrag = (onDrag: (e: MouseEvent) => void) => {
    const stopDrag = useCallback(() => {
        globalThis.removeEventListener('mousemove', onDrag)
        globalThis.removeEventListener('mouseup', stopDrag)
    }, [onDrag])

    const startDrag = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            onDrag(e.nativeEvent)
            globalThis.addEventListener('mousemove', onDrag)
            globalThis.addEventListener('mouseup', stopDrag)
        },
        [onDrag, stopDrag],
    )

    return startDrag
}

export default useDrag
