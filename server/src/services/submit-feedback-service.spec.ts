import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('should submit feedback', async () => {
        await expect(submitFeedback.submit({
            type: 'bug',
            comment: 'isso aqui é uma porcaria',
            screenshot: 'data:image/png;base64sdhsdfhdh'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalledTimes(1)
        expect(sendMailSpy).toHaveBeenCalledTimes(1)
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