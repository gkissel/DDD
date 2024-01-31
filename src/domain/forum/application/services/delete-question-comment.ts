import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

interface DeleteQuestionCommentServiceRequest {
  authorId: string
  questionCommentId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteQuestionCommentServiceResponse {}

export class DeleteQuestionCommentService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentServiceRequest): Promise<DeleteQuestionCommentServiceResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
