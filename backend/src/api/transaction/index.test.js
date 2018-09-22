import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Transaction } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, transaction

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  transaction = await Transaction.create({ user })
})

test('POST /Transactions 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, Products: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Transactions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Transactions 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Transactions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Transactions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${transaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaction.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Transactions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('GET /Transactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Transactions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
    .send({ access_token: userSession, Products: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaction.id)
  expect(body.Products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Transactions/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
    .send({ access_token: anotherSession, Products: 'test' })
  expect(status).toBe(401)
})

test('PUT /Transactions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('PUT /Transactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, Products: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Transactions/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Transactions/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Transactions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('DELETE /Transactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
