import { Transaction } from '.'
import { User } from '../user'

let user, transaction

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  transaction = await Transaction.create({ user, Products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = transaction.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Products).toBe(transaction.Products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = transaction.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaction.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Products).toBe(transaction.Products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
