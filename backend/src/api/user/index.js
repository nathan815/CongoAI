import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordauth, master, token } from '../../services/passport'
import { index, showMe, show, create, update, updatePassword, destroy } from './controller'
import { schema } from './model'
export user, { schema } from './model'

const router = new Router()
const { email, password, name, picture, role } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName Retrieveusers
 * @apiGroup user
 * @apiPermission admin
 * @apiParam {String} access_token user access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentuser
 * @apiGroup user
 * @apiPermission user
 * @apiParam {String} access_token user access_token.
 * @apiSuccess {Object} user user's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName Retrieveuser
 * @apiGroup user
 * @apiPermission public
 * @apiSuccess {Object} user user's data.
 * @apiError 404 user not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /users Create user
 * @apiName Createuser
 * @apiGroup user
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email user's email.
 * @apiParam {String{6..}} password user's password.
 * @apiParam {String} [name] user's name.
 * @apiParam {String} [picture] user's picture.
 * @apiParam {String=user,admin} [role=user] user's role.
 * @apiSuccess (Sucess 201) {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  body({ email, password, name, picture, role }),
  create)

/**
 * @api {put} /users/:id Update user
 * @apiName Updateuser
 * @apiGroup user
 * @apiPermission user
 * @apiParam {String} access_token user access_token.
 * @apiParam {String} [name] user's name.
 * @apiParam {String} [picture] user's picture.
 * @apiSuccess {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 user not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture }),
  update)

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup user
 * @apiHeader {String} authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password user's new password.
 * @apiSuccess (Success 201) {Object} user user's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 user not found.
 */
router.put('/:id/password',
  passwordauth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Delete user
 * @apiName Deleteuser
 * @apiGroup user
 * @apiPermission admin
 * @apiParam {String} access_token user access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 user not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
