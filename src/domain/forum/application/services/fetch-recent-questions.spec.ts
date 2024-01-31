import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestions } from './fetch-recent-questions'
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestions

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestions(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recents questions', async () => {
    for (let i = 1; i <= 10; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2021, 0, i) }),
      )
    }

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toHaveLength(10)
    expect(questions[0].createdAt).toEqual(new Date(2021, 0, 10))
  })

  it('should be able to fetch recents questions with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2021, 0, i) }),
      )
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
    expect(questions[0].createdAt).toEqual(new Date(2021, 0, 2))
  })
})
