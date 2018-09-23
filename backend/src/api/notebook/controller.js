import { success, notFound, authorOrAdmin } from '../../services/response/'
import { notebook } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  notebook.create({ ...body, user })
    .then((notebook) => notebook.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  notebook.find(query, select, cursor)
    .populate('user')
    .then((notebooks) => notebooks.map((notebook) => notebook.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  notebook.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((notebook) => notebook ? notebook.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  notebook.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((notebook) => notebook ? Object.assign(notebook, body).save() : null)
    .then((notebook) => notebook ? notebook.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  notebook.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((notebook) => notebook ? notebook.remove() : null)
    .then(success(res, 204))
    .catch(next)
