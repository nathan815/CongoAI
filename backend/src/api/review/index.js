import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Review, { schema } from './model'

const router = new Router()
const { rating, text } = schema.tree

/**
 * @api {post} /Reviews Create review
 * @apiName CreateReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating Review's rating.
 * @apiParam text Review's text.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ rating, text }),
  create)

/**
 * @api {get} /Reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Review
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
 * @api {get} /Reviews/:id Retrieve review
 * @apiName RetrieveReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Reviews/:id Update review
 * @apiName UpdateReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating Review's rating.
 * @apiParam text Review's text.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ rating, text }),
  update)

/**
 * @api {delete} /Reviews/:id Delete review
 * @apiName DeleteReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
