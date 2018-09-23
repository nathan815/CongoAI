import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Payment, { schema } from './model'

const router = new Router()
const { cardNumber, expirationDate, cardCode } = schema.tree

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam cardNumber Payment's cardNumber.
 * @apiParam expirationDate Payment's expirationDate.
 * @apiParam cardCode Payment's cardCode.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ cardNumber, expirationDate, cardCode }),
  create)

/**
 * @api {get} /payments Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} payments List of payments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /payments/:id Retrieve payment
 * @apiName RetrievePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /payments/:id Update payment
 * @apiName UpdatePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam cardNumber Payment's cardNumber.
 * @apiParam expirationDate Payment's expirationDate.
 * @apiParam cardCode Payment's cardCode.
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ cardNumber, expirationDate, cardCode }),
  update)

/**
 * @api {delete} /payments/:id Delete payment
 * @apiName DeletePayment
 * @apiGroup Payment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Payment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
