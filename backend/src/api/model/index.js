import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Model, { schema } from './model'

const router = new Router()
const { Notebook, name, port, filepath, category } = schema.tree

/**
 * @api {post} /Models Create model
 * @apiName CreateModel
 * @apiGroup Model
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Notebook Model's Notebook.
 * @apiParam name Model's name.
 * @apiParam port Model's port.
 * @apiParam filepath Model's filepath.
 * @apiParam category Model's category.
 * @apiSuccess {Object} model Model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Model not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ Notebook, name, port, filepath, category }),
  create)

/**
 * @api {get} /Models Retrieve models
 * @apiName RetrieveModels
 * @apiGroup Model
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} models List of models.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /Models/:id Retrieve model
 * @apiName RetrieveModel
 * @apiGroup Model
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} model Model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Model not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Models/:id Update model
 * @apiName UpdateModel
 * @apiGroup Model
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Notebook Model's Notebook.
 * @apiParam name Model's name.
 * @apiParam port Model's port.
 * @apiParam filepath Model's filepath.
 * @apiParam category Model's category.
 * @apiSuccess {Object} model Model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Model not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ Notebook, name, port, filepath, category }),
  update)

/**
 * @api {delete} /Models/:id Delete model
 * @apiName DeleteModel
 * @apiGroup Model
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Model not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
