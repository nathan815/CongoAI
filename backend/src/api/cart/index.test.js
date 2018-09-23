import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { user } from '../user'
import routes, { cart } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, cart

beforeEach(async () => {
  const user = await user.create({ email: 'a@a.com', password: '123456' })
  const anotheruser = await user.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotheruser.id)
  cart = await cart.create({ user })
})

test('POST /carts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, products: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /carts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /carts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /carts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /carts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /carts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('GET /carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /carts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
    .send({ access_token: userSession, products: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
  expect(body.products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /carts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
    .send({ access_token: anotherSession, products: 'test' })
  expect(status).toBe(401)
})

test('PUT /carts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('PUT /carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, products: 'test' })
  expect(status).toBe(404)
})

test('DELETE /carts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /carts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /carts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('DELETE /carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
