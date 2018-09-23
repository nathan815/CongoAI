import { transaction } from '.'
import { user } from '../user'

let user, transaction

beforeEach(async () => {
  user = await user.create({ email: 'a@a.com', password: '123456' })
  transaction = await transaction.create({ user, products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = transaction.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(transaction.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = transaction.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(transaction.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
