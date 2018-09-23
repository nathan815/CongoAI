import { success, notFound } from '../../services/response/'
import { sendMail } from '../../services/sendgrid'
import { passwordreset } from '.'
import { user } from '../user'

export const create = ({ bodymen: { body: { email, link } } }, res, next) =>
  user.findOne({ email })
    .then(notFound(res))
    .then((user) => user ? passwordreset.create({ user }) : null)
    .then((reset) => {
      if (!reset) return null
      const { user, token } = reset
      link = `${link.replace(/\/$/, '')}/${token}`
      const content = `
        Hey, ${user.name}.<br><br>
        You requested a new password for your CongoAI account.<br>
        Please use the following link to set a new password. It will expire in 1 hour.<br><br>
        <a href="${link}">${link}</a><br><br>
        If you didn't make this request then you can safely ignore this email. :)<br><br>
        &mdash; CongoAI Team
      `
      return sendMail({ toEmail: email, subject: 'CongoAI - Password Reset', content })
    })
    .then((response) => response ? res.status(response.statusCode).end() : null)
    .catch(next)

export const show = ({ params: { token } }, res, next) =>
  passwordreset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => reset ? reset.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ params: { token }, bodymen: { body: { password } } }, res, next) => {
  return passwordreset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => {
      if (!reset) return null
      const { user } = reset
      return user.set({ password }).save()
        .then(() => passwordreset.remove({ user }))
        .then(() => user.view(true))
    })
    .then(success(res))
    .catch(next)
}
