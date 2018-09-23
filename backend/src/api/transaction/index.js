import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export transaction, { schema } from './model'

const router = new Router()
const { products } = schema.tree

/**
 * @api {post} /transactions Create transaction
 * @apiName Createtransaction
 * @apiGroup transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam products transaction's products.
 * @apiSuccess {Object} transaction transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 transaction not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ products }),
  create)

/**
 * @api {get} /transactions Retrieve transactions
 * @apiName Retrievetransactions
 * @apiGroup transaction
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
 * @api {get} /transactions/:id Retrieve transaction
 * @apiName Retrievetransaction
 * @apiGroup transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} transaction transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 transaction not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /transactions/:id Update transaction
 * @apiName Updatetransaction
 * @apiGroup transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam products transaction's products.
 * @apiSuccess {Object} transaction transaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 transaction not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ products }),
  update)

/**
 * @api {delete} /transactions/:id Delete transaction
 * @apiName Deletetransaction
 * @apiGroup transaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 transaction not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
