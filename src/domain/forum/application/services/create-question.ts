import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface CreateQuestionServiceRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionServiceResponse {
  question: Question
}

export class CreateQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionServiceRequest): Promise<CreateQuestionServiceResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
