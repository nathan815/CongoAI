import { Cart } from '.'
import { User } from '../user'

let user, cart

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  cart = await Cart.create({ user, Products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cart.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Products).toBe(cart.Products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cart.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Products).toBe(cart.Products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
