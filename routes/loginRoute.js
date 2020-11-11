const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')
const jwt = require('jsonwebtoken')
const routeErrorHandler = require('../middleware/errorMiddleware')
const { checkPassword } = require('../helper/bcryptHelper')
const secret = 'ini kode rahasia saya'

// cara 1 async await using try and catch
app.post('/login', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  let user;
  try {
    const userSearchResults = await db.get('users', { username })
    if (userSearchResults.length) {
      user = userSearchResults[0]
      const isPasswordMatch = await checkPassword(password, user.password)
      if (isPasswordMatch) {
        const token = jwt.sign(user, secret, {
          expiresIn: '6h'
        })
        user.token = token
        res.send(user)
      } else {
        res.status(401).send('Unauthorized')
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  } catch (error) {
    next(error)
  }
})

// cara 2 async wait using catch after await
// app.post('/login', async (req, res, next) => {
//   const username = req.body.username
//   const password = req.body.password
//   let user;

//   const userSearchResults = await db.get('users', { username })
//   .catch(err => next(err))
//   if (userSearchResults.length) {
//     user = userSearchResults[0]
//     const isPasswordMatch = await checkPassword(password, user.password)
//     .catch(err => next(err))
//     if (isPasswordMatch) {
//       const token = jwt.sign(user, secret, {
//         expiresIn: '6h'
//       })
//       user.token = token
//       res.send(user)
//     } else {
//       res.status(401).send('Unauthorized')
//     }
//   } else {
//     res.status(401).send('Unauthorized')
//   }
// })

app.use(routeErrorHandler)

module.exports = app