import { AnswersRepository } from '../repositories//answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionAnswersServiceRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersServiceResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
