import { beforeEach, expect, it, test } from 'vitest'
import { AnswerQuestionService } from './answer-question'
import { describe } from 'node:test'

let sut: AnswerQuestionService

describe('AnswerQuestionService', () => {
  beforeEach(() => {
    sut = new AnswerQuestionService()
  })

  it('should be able to create an answer', () => {
    const answer = sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
