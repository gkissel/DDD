import { beforeEach, expect, it } from 'vitest'
import { AnswerQuestionService } from './answer-question'
import { describe } from 'node:test'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

let sut: AnswerQuestionService

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return Promise.resolve()
  },
}

describe('AnswerQuestionService', () => {
  beforeEach(() => {
    sut = new AnswerQuestionService(fakeAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const answer = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
