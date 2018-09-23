import { review } from '.'
import { user } from '../user'

let user, review

beforeEach(async () => {
  user = await user.create({ email: 'a@a.com', password: '123456' })
  review = await review.create({ user, rating: 'test', text: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = review.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(review.rating)
    expect(view.text).toBe(review.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = review.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(review.rating)
    expect(view.text).toBe(review.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
