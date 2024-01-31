import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public registries: Question[] = []

  async findById(id: string) {
    const question = this.registries.find(
      (registry) => registry.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

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
  }

  async delete(question: Question) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === question.id,
    )

    this.registries.splice(itemIndex, 1)
  }
}
