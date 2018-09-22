import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Review } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, review

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  review = await Review.create({ user })
})

test('POST /Reviews 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, rating: 'test', text: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.rating).toEqual('test')
  expect(body.text).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /Reviews 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Reviews 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /Reviews 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Reviews/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${review.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(review.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /Reviews/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${review.id}`)
  expect(status).toBe(401)
})

test('GET /Reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /Reviews/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${review.id}`)
    .send({ access_token: userSession, rating: 'test', text: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(review.id)
  expect(body.rating).toEqual('test')
  expect(body.text).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /Reviews/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${review.id}`)
    .send({ access_token: anotherSession, rating: 'test', text: 'test' })
  expect(status).toBe(401)
})

test('PUT /Reviews/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${review.id}`)
  expect(status).toBe(401)
})

test('PUT /Reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, rating: 'test', text: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Reviews/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${review.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /Reviews/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${review.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /Reviews/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${review.id}`)
  expect(status).toBe(401)
})

test('DELETE /Reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
