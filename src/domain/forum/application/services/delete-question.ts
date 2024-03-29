import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

interface DeleteQuestionServiceRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>
export class DeleteQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionServiceRequest): Promise<DeleteQuestionServiceResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
