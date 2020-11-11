  
const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const passport = require('../../middleware/authorizationMiddleware')
const routeErrorHandler = require('../../middleware/errorMiddleware')

app.use(passport.authenticate('bearer', { session: false }))

app.delete('/inventories', (req, res, next) => {
  const id = req.body.id
  db.remove('inventories', id)
    .then(() => {
      res.send("Ok")
    })
    .catch(err => {
      next(err)
    })
})

app.use(routeErrorHandler)

module.exports = app