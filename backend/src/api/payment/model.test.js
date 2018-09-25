import { Payment } from '.'
import { User } from '../user'

let user, payment

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  payment = await Payment.create({ user, cardNumber: 'test', expirationDate: 'test', cardCode: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = payment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.cardNumber).toBe(payment.cardNumber)
    expect(view.expirationDate).toBe(payment.expirationDate)
    expect(view.cardCode).toBe(payment.cardCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = payment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.cardNumber).toBe(payment.cardNumber)
    expect(view.expirationDate).toBe(payment.expirationDate)
    expect(view.cardCode).toBe(payment.cardCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
