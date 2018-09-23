import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export notebook, { schema } from './model'

const router = new Router()
const { html, model } = schema.tree

/**
 * @api {post} /notebooks Create notebook
 * @apiName Createnotebook
 * @apiGroup notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam html notebook's html.
 * @apiParam model notebook's model.
 * @apiSuccess {Object} notebook notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 notebook not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ html, model }),
  create)

/**
 * @api {get} /notebooks Retrieve notebooks
 * @apiName Retrievenotebooks
 * @apiGroup notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} notebooks List of notebooks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /notebooks/:id Retrieve notebook
 * @apiName Retrievenotebook
 * @apiGroup notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} notebook notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 notebook not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /notebooks/:id Update notebook
 * @apiName Updatenotebook
 * @apiGroup notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam html notebook's html.
 * @apiParam model notebook's model.
 * @apiSuccess {Object} notebook notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 notebook not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ html, model }),
  update)

/**
 * @api {delete} /notebooks/:id Delete notebook
 * @apiName Deletenotebook
 * @apiGroup notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 notebook not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
