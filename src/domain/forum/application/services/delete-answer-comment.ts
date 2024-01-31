import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

interface DeleteAnswerCommentServiceRequest {
  authorId: string
  answerCommentId: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteAnswerCommentServiceResponse = Either<string, {}>

export class DeleteAnswerCommentService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentServiceRequest): Promise<DeleteAnswerCommentServiceResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
