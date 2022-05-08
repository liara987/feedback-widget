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
                `<p> Screenshot: ${screenshot} </p>`,
            ].join('\n')
        })
    }


}