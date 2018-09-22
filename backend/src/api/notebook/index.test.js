import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Notebook } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, notebook

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  notebook = await Notebook.create({ user })
})

test('POST /Notebooks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, html: 'test', Model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.html).toEqual('test')
  expect(body.Model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Notebooks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Notebooks 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Notebooks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Notebooks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notebook.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notebook.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Notebooks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('GET /Notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Notebooks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
    .send({ access_token: userSession, html: 'test', Model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notebook.id)
  expect(body.html).toEqual('test')
  expect(body.Model).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Notebooks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
    .send({ access_token: anotherSession, html: 'test', Model: 'test' })
  expect(status).toBe(401)
})

test('PUT /Notebooks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('PUT /Notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, html: 'test', Model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Notebooks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Notebooks/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Notebooks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notebook.id}`)
  expect(status).toBe(401)
})

test('DELETE /Notebooks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
