import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Transaction } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Transaction.create({ ...body, user })
    .then((transaction) => transaction.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Transaction.find(query, select, cursor)
    .populate('user')
    .then((transactions) => transactions.map((transaction) => transaction.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Transaction.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((transaction) => transaction ? transaction.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Transaction.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((transaction) => transaction ? Object.assign(transaction, body).save() : null)
    .then((transaction) => transaction ? transaction.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Transaction.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((transaction) => transaction ? transaction.remove() : null)
    .then(success(res, 204))
    .catch(next)
