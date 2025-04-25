import React, { useCallback } from "react";

const useDrag = (onDrag: (e: MouseEvent) => void) => {
    const startDrag = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        onDrag(e.nativeEvent);
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", stopDrag);
    }, [onDrag]);

    const stopDrag = useCallback(() => {
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", stopDrag);
    }, [onDrag]);

    return startDrag;
};

export default useDrag;