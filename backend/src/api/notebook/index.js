import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Notebook, { schema } from './model'

const router = new Router()
const { html, Model } = schema.tree

/**
 * @api {post} /Notebooks Create notebook
 * @apiName CreateNotebook
 * @apiGroup Notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam html Notebook's html.
 * @apiParam Model Notebook's Model.
 * @apiSuccess {Object} notebook Notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notebook not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ html, Model }),
  create)

/**
 * @api {get} /Notebooks Retrieve notebooks
 * @apiName RetrieveNotebooks
 * @apiGroup Notebook
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
 * @api {get} /Notebooks/:id Retrieve notebook
 * @apiName RetrieveNotebook
 * @apiGroup Notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} notebook Notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notebook not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Notebooks/:id Update notebook
 * @apiName UpdateNotebook
 * @apiGroup Notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam html Notebook's html.
 * @apiParam Model Notebook's Model.
 * @apiSuccess {Object} notebook Notebook's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notebook not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ html, Model }),
  update)

/**
 * @api {delete} /Notebooks/:id Delete notebook
 * @apiName DeleteNotebook
 * @apiGroup Notebook
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notebook not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
