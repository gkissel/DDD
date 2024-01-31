import { describe, it, expect } from 'vitest'
import { CreateQuestionService } from './create-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let sut: CreateQuestionService
let questionsRepository: QuestionsRepository

describe('create Question Service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()

    sut = new CreateQuestionService(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const question = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Nova pergunta',
    })

    expect(question.question).toBeDefined()
    expect(question.question.authorId.toString()).toEqual('1')
    expect(question.question.content).toEqual('Nova pergunta')
  })
})
