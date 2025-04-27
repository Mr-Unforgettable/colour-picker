export const hsvToRgb = (h: number, s: number, v: number) => {
    const f = (n: number, k = (n + h / 60) % 6) =>
        v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
    const r = Math.round(f(5) * 255)
    const g = Math.round(f(3) * 255)
    const b = Math.round(f(1) * 255)
    return { r, g, b }
}

export const rgbToHex = ({
    r,
    g,
    b,
}: {
    r: number
    g: number
    b: number
}): string => {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

export const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    const d = max - min

    let h = 0
    const s = max === 0 ? 0 : d / max,
        v = max

    switch (max) {
        case min:
            h = 0
            break
        case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
        case g:
            h = (b - r) / d + 2
            break
        case b:
            h = (r - g) / d + 4
            break
    }

    h *= 60
    return { h, s, v }
}

export function rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    let h: number = 0,
        s: number
    const l: number = (max + min) / 2

    if (max === min) {
        h = s = 0 // achromatic
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}
