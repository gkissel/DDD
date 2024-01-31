import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public registries: Answer[] = []

  async findById(id: string) {
    const answer = this.registries.find(
      (registry) => registry.id.toString() === id,
    )

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.registries
      .filter((registry) => registry.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === answer.id,
    )

    this.registries[itemIndex] = answer
  }

  create(answer: Answer) {
    this.registries.push(answer)

    return Promise.resolve()
  }

  async delete(question: Answer) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === question.id,
    )

    this.registries.splice(itemIndex, 1)
  }
}
