import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { user } from '../user'
import routes, { notebook } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, notebook

beforeEach(async () => {
  const user = await user.create({ email: 'a@a.com', password: '123456' })
  const anotheruser = await user.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotheruser.id)
  notebook = await notebook.create({ user })
})

test('POST /notebooks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, html: 'test', model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.html).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /notebooks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notebooks 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /notebooks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notebooks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notebook.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notebook.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /notebooks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('GET /notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /notebooks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
    .send({ access_token: userSession, html: 'test', model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notebook.id)
  expect(body.html).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /notebooks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
    .send({ access_token: anotherSession, html: 'test', model: 'test' })
  expect(status).toBe(401)
})

test('PUT /notebooks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('PUT /notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, html: 'test', model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notebooks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /notebooks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /notebooks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('DELETE /notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
