import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export cart, { schema } from './model'

const router = new Router()
const { products } = schema.tree

/**
 * @api {post} /carts Create cart
 * @apiName Createcart
 * @apiGroup cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam products cart's products.
 * @apiSuccess {Object} cart cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 cart not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ products }),
  create)

/**
 * @api {get} /carts Retrieve carts
 * @apiName Retrievecarts
 * @apiGroup cart
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
 * @api {get} /carts/:id Retrieve cart
 * @apiName Retrievecart
 * @apiGroup cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cart cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 cart not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /carts/:id Update cart
 * @apiName Updatecart
 * @apiGroup cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam products cart's products.
 * @apiSuccess {Object} cart cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 cart not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ products }),
  update)

/**
 * @api {delete} /carts/:id Delete cart
 * @apiName Deletecart
 * @apiGroup cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 cart not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
