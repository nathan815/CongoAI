import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Model } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, model

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  model = await Model.create({ user })
})

test('POST /Models 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, Notebook: 'test', name: 'test', port: 'test', filepath: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Notebook).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.port).toEqual('test')
  expect(body.filepath).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Models 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Models 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Models 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Models/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${model.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(model.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Models/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${model.id}`)
  expect(status).toBe(401)
})

test('GET /Models/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Models/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${model.id}`)
    .send({ access_token: userSession, Notebook: 'test', name: 'test', port: 'test', filepath: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(model.id)
  expect(body.Notebook).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.port).toEqual('test')
  expect(body.filepath).toEqual('test')
  expect(body.category).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Models/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${model.id}`)
    .send({ access_token: anotherSession, Notebook: 'test', name: 'test', port: 'test', filepath: 'test', category: 'test' })
  expect(status).toBe(401)
})

test('PUT /Models/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${model.id}`)
  expect(status).toBe(401)
})

test('PUT /Models/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, Notebook: 'test', name: 'test', port: 'test', filepath: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Models/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${model.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Models/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${model.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Models/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${model.id}`)
  expect(status).toBe(401)
})

test('DELETE /Models/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
