import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Model } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Model.create({ ...body, user })
    .then((model) => model.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Model.find(query, select, cursor)
    .populate('user')
    .then((models) => models.map((model) => model.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Model.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((model) => model ? model.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Model.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((model) => model ? Object.assign(model, body).save() : null)
    .then((model) => model ? model.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Model.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((model) => model ? model.remove() : null)
    .then(success(res, 204))
    .catch(next)
