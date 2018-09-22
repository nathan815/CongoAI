import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Transaction, { schema } from './model'

const router = new Router()
const { Products } = schema.tree

/**
 * @api {post} /Transactions Create transaction
 * @apiName CreateTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Products Transaction's Products.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ Products }),
  create)

/**
 * @api {get} /Transactions Retrieve transactions
 * @apiName RetrieveTransactions
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} transactions List of transactions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /Transactions/:id Retrieve transaction
 * @apiName RetrieveTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Transactions/:id Update transaction
 * @apiName UpdateTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Products Transaction's Products.
 * @apiSuccess {Object} transaction Transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ Products }),
  update)

/**
 * @api {delete} /Transactions/:id Delete transaction
 * @apiName DeleteTransaction
 * @apiGroup Transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transaction not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
