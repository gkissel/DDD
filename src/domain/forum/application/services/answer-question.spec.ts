import { beforeEach, expect, it } from 'vitest'
import { AnswerQuestionService } from './answer-question'
import { describe } from 'node:test'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let answersRepository: AnswersRepository
let sut: AnswerQuestionService

describe('AnswerQuestionService', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionService(answersRepository)
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
