import { prisma } from "../../prisma";
import { FeedbackCreate, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: FeedbackCreate) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })
    }
}