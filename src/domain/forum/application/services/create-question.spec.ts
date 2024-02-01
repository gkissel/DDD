import { describe, it, expect } from 'vitest'
import { CreateQuestionService } from './create-question'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let sut: CreateQuestionService
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('create Question Service', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CreateQuestionService(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.registries[0]).toEqual(
      result.value?.question,
    )
  })
})
