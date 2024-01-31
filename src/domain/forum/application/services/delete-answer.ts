import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerServiceRequest {
  authorId: string
  answerId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerServiceResponse {}

export class DeleteAnswerService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId: questionId,
    authorId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(questionId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
