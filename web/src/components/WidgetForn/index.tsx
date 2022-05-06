import { useState } from 'react'
import bugIcon from '../../assets/bug.png'
import ideaIcon from '../../assets/idea.png'
import thoughtIcon from '../../assets/thought.png'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'

export const feedbackTypes = {
    bug: {
        title: "Problema",
        image: {
            src: bugIcon,
            alt: 'Icone de um inseto'
        }
    },
    idea: {
        title: "Ideia",
        image: {
            src: ideaIcon,
            alt: 'Icone de uma lampada'
        }
    },
    others: {
        title: "Outros",
        image: {
            src: thoughtIcon,
            alt: 'Icone de uma nuvem de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handdleFeedbackRestart() {
        setFeedbackSent(false )
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handdleFeedbackRestart} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}></FeedbackTypeStep>
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestart={handdleFeedbackRestart}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}
            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-1" href="https://github.com/liara987">Liara Programadora</a>
            </footer>
        </div>
    )
}