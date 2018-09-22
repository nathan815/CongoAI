import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Product } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, product

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  product = await Product.create({ user })
})

test('POST /Products 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', desc: 'test', category: 'test', Review: 'test', Model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.Review).toEqual('test')
  expect(body.Model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Products 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Products 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Products 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Products/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${product.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Products/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('GET /Products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Products/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ access_token: userSession, title: 'test', desc: 'test', category: 'test', Review: 'test', Model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
  expect(body.title).toEqual('test')
  expect(body.desc).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.Review).toEqual('test')
  expect(body.Model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Products/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ access_token: anotherSession, title: 'test', desc: 'test', category: 'test', Review: 'test', Model: 'test' })
  expect(status).toBe(401)
})

test('PUT /Products/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('PUT /Products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', desc: 'test', category: 'test', Review: 'test', Model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Products/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Products/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Products/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('DELETE /Products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
