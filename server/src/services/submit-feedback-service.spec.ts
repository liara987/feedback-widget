import { SubmitFeedbackService } from "./submit-feedback-service"

const submitFeedback = new SubmitFeedbackService(
    { create: async () => { } },
    { sendMail: async () => { } }
)
describe('Submit feedback', () => {
    it('should submit feedback', async () => {
        await expect(submitFeedback.submit({
            type: 'bug',
            comment: 'isso aqui é uma porcaria',
            screenshot: 'data:image/png;base64sdhsdfhdh'
        })).resolves.not.toThrow()
    })

    it('should not submit feedback without a type', async () => {
        await expect(submitFeedback.submit({
            type: '',
            comment: 'isso aqui é uma porcaria',
            screenshot: 'data:image/png;base64sdhsdfhdh'
        })).rejects.toThrow()
    })

    it('should not submit feedback without a comment', async () => {
        await expect(submitFeedback.submit({
            type: 'bug',
            comment: '',
            screenshot: 'data:image/png;base64sdhsdfhdh'
        })).rejects.toThrow()
    })

    it('should not submit feedback without an invalid screenshot', async () => {
        await expect(submitFeedback.submit({
            type: 'bug',
            comment: 'test comment',
            screenshot: 'teste.png'
        })).rejects.toThrow()
    })
})