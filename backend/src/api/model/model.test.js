import { Model } from '.'
import { User } from '../user'

let user, model

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  model = await Model.create({ user, Notebook: 'test', name: 'test', port: 'test', filepath: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = model.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(model.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Notebook).toBe(model.Notebook)
    expect(view.name).toBe(model.name)
    expect(view.port).toBe(model.port)
    expect(view.filepath).toBe(model.filepath)
    expect(view.category).toBe(model.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = model.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(model.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.Notebook).toBe(model.Notebook)
    expect(view.name).toBe(model.name)
    expect(view.port).toBe(model.port)
    expect(view.filepath).toBe(model.filepath)
    expect(view.category).toBe(model.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
