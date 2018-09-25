import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Payment } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, payment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  payment = await Payment.create({ user })
})

test('POST /payments 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, cardNumber: 'test', expirationDate: 'test', cardCode: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.cardNumber).toEqual('test')
  expect(body.expirationDate).toEqual('test')
  expect(body.cardCode).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /payments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /payments 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /payments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /payments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${payment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /payments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('GET /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /payments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
    .send({ access_token: userSession, cardNumber: 'test', expirationDate: 'test', cardCode: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
  expect(body.cardNumber).toEqual('test')
  expect(body.expirationDate).toEqual('test')
  expect(body.cardCode).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /payments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
    .send({ access_token: anotherSession, cardNumber: 'test', expirationDate: 'test', cardCode: 'test' })
  expect(status).toBe(401)
})

test('PUT /payments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('PUT /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, cardNumber: 'test', expirationDate: 'test', cardCode: 'test' })
  expect(status).toBe(404)
})

test('DELETE /payments/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /payments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /payments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
  expect(status).toBe(401)
})

test('DELETE /payments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
