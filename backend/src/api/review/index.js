import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export review, { schema } from './model'

const router = new Router()
const { rating, text } = schema.tree

/**
 * @api {post} /reviews Create review
 * @apiName Createreview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating review's rating.
 * @apiParam text review's text.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ rating, text }),
  create)

/**
 * @api {get} /reviews Retrieve reviews
 * @apiName Retrievereviews
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /reviews/:id Retrieve review
 * @apiName Retrievereview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /reviews/:id Update review
 * @apiName Updatereview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating review's rating.
 * @apiParam text review's text.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ rating, text }),
  update)

/**
 * @api {delete} /reviews/:id Delete review
 * @apiName Deletereview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
