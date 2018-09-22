import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Cart, { schema } from './model'

const router = new Router()
const { Products } = schema.tree

/**
 * @api {post} /Carts Create cart
 * @apiName CreateCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Products Cart's Products.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ Products }),
  create)

/**
 * @api {get} /Carts Retrieve carts
 * @apiName RetrieveCarts
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} carts List of carts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /Carts/:id Retrieve cart
 * @apiName RetrieveCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Carts/:id Update cart
 * @apiName UpdateCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Products Cart's Products.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ Products }),
  update)

/**
 * @api {delete} /Carts/:id Delete cart
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
