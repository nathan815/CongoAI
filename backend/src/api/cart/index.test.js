import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Cart } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, cart

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  cart = await Cart.create({ user })
})

test('POST /Carts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, Products: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Carts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Carts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Carts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Carts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Carts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('GET /Carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Carts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
    .send({ access_token: userSession, Products: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
  expect(body.Products).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Carts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
    .send({ access_token: anotherSession, Products: 'test' })
  expect(status).toBe(401)
})

test('PUT /Carts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('PUT /Carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, Products: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Carts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Carts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Carts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('DELETE /Carts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
