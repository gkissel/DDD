import { describe, it, expect } from 'vitest'
import { CreateQuestionService } from './create-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

let sut: CreateQuestionService
let fakeQuestionsRepository: QuestionsRepository

describe('create Question Service', () => {
  beforeEach(() => {
    fakeQuestionsRepository = {
      create: async (question: Question) => {
        return Promise.resolve()
      },
    }
    sut = new CreateQuestionService(fakeQuestionsRepository)
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
