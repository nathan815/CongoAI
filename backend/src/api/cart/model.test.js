import { cart } from '.'
import { user } from '../user'

let user, cart

beforeEach(async () => {
  user = await user.create({ email: 'a@a.com', password: '123456' })
  cart = await cart.create({ user, products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cart.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(cart.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cart.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.products).toBe(cart.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
