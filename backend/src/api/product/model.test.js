import { Product } from '.'
import { User } from '../user'

let user, product

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  product = await Product.create({ user, title: 'test', desc: 'test', category: 'test', Review: 'test', Model: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(product.title)
    expect(view.desc).toBe(product.desc)
    expect(view.category).toBe(product.category)
    expect(view.Review).toBe(product.Review)
    expect(view.Model).toBe(product.Model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(product.title)
    expect(view.desc).toBe(product.desc)
    expect(view.category).toBe(product.category)
    expect(view.Review).toBe(product.Review)
    expect(view.Model).toBe(product.Model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
