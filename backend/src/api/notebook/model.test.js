import { Notebook } from '.'
import { User } from '../user'

let user, notebook

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  notebook = await Notebook.create({ user, html: 'test', Model: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notebook.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notebook.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.html).toBe(notebook.html)
    expect(view.Model).toBe(notebook.Model)
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
    expect(view.Model).toBe(notebook.Model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
