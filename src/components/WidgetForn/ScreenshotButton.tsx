import { Camera } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonType {
    onScreenshotTook: (screenshot: string) => void
}
export function ScreenshotButton({onScreenshotTook}: ScreenshotButtonType) {
    const [screenshot, setScreenshot] = useState<string|null>(null)
    const [isTakingScreenshot, setisTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setisTakingScreenshot(true)
        const canva = await html2canvas(document.querySelector('html')!)
        const base64image = canva.toDataURL('image/png')
        onScreenshotTook(base64image)
    }
    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:scrollbar-thumb-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
        </button>
    );
}