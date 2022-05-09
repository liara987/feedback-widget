import { FeedbackType, feedbackTypes } from ".."
import { ButtonClose } from "../../ButtonClose"

interface FeedbackTypeProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeProps) {
    return (
        <>
            <header>
                <span className="text-xl leading-6">Give your feedback</span>
                <ButtonClose />
            </header>
            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button
                            key={key}
                            className='bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'
                            type='button'
                            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                        >
                            <img src={value.image.src} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}