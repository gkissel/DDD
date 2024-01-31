import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public registries: Question[] = []

  create(question: Question) {
    this.registries.push(question)

    return Promise.resolve()
  }
}
