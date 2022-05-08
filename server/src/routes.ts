import express from 'express'
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackService.submit({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})