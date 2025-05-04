interface EyeDropperResult {
    sRGBHex: string;
}

declare global {
    interface Window {
        EyeDropper: {
            new (): EyeDropper;
        }
    }
}

export {}
