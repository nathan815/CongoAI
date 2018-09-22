import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Product, { schema } from './model'

const router = new Router()
const { title, desc, category, Review, Model } = schema.tree

/**
 * @api {post} /Products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Product's title.
 * @apiParam desc Product's desc.
 * @apiParam category Product's category.
 * @apiParam Review Product's Review.
 * @apiParam Model Product's Model.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, desc, category, Review, Model }),
  create)

/**
 * @api {get} /Products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: false }),
  query(),
  index)

/**
 * @api {get} /Products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: false }),
  show)

/**
 * @api {put} /Products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Product's title.
 * @apiParam desc Product's desc.
 * @apiParam category Product's category.
 * @apiParam Review Product's Review.
 * @apiParam Model Product's Model.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, desc, category, Review, Model }),
  update)

/**
 * @api {delete} /Products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
