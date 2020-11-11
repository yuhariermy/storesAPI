const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../middleware/authorizationMiddleware')
const routeErrorHandler = require('../../middleware/errorMiddleware')

app.use(passport.authenticate('bearer', { session: false }))

app.patch('/goods', (req, res, next) => {
  const id = req.body.id
  const body = req.body
  db.edit('goods', id, body)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      next(err)
    })
})

app.use(routeErrorHandler)

module.exports = app