import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public registries: Question[] = []

  async findBySlug(slug: string) {
    const question = this.registries.find(
      (registry) => registry.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.registries.push(question)

    return Promise.resolve()
  }
}
