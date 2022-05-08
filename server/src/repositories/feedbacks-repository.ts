export interface FeedbackCreate {
    type: string;
    comment: string;
    screenshot?: string;
}
export interface FeedbacksRepository {
    create: (data: FeedbackCreate) => Promise<void>
}