import { passwordreset } from '.'
import { user } from '../user'

let passwordReset

beforeEach(async () => {
  const user = await user.create({ email: 'a@a.com', password: '123456' })
  passwordReset = await passwordreset.create({ user })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = passwordReset.view()
    expect(view.token).toBe(passwordReset.token)
    expect(typeof view.user).toBe('object')
  })

  it('returns full view', () => {
    const view = passwordReset.view(true)
    expect(view.token).toBe(passwordReset.token)
    expect(view.user).toEqual(passwordReset.user.view(true))
  })
})
