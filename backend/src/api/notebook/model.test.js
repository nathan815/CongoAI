import { notebook } from '.'
import { user } from '../user'

let user, notebook

beforeEach(async () => {
  user = await user.create({ email: 'a@a.com', password: '123456' })
  notebook = await notebook.create({ user, html: 'test', model: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notebook.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notebook.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.html).toBe(notebook.html)
    expect(view.model).toBe(notebook.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = notebook.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notebook.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.html).toBe(notebook.html)
    expect(view.model).toBe(notebook.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
