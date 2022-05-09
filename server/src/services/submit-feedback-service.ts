import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async submit({ type, comment, screenshot }: SubmitFeedbackServiceRequest) {
        this.screenshotIsValid(screenshot)
        this.typeIsValid(type)
        this.commentIsValid(comment)
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<p> Tipo de feedback: ${type} </p>`,
                `<p> Comentário: ${comment} </p>`,
                screenshot ? `<img src="${screenshot}"/>`: '',
            ].join('\n')
        })
    }

    screenshotIsValid(screenshot: string | undefined) {
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot')
        }
    }

    typeIsValid(type: string | undefined) {
        if (!type) {
            throw new Error('Type must be defined')
        }
    }

    commentIsValid(comment: string | undefined) {
        if (!comment) {
            throw new Error('Comment must be defined')
        }
    }
}