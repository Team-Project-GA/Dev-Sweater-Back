// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for products
const Product = require('../models/products')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`

// we'll use this function to send 404 when non-existant document is requested
// const handle404 = customErrors.handle404

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /products
router.get('/products', (req, res, next) => {
  Product.find()
    .then(products => {
      // `products` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return products.map(product => product.toObject())
    })
    // respond with status 200 and JSON of the products
    .then(products => res.status(200).json({ products: products }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /products
router.post('/products', requireToken, (req, res, next) => {
  // set owner of new product to be current user
  req.body.product.owner = req.user.id

  Product.create(req.body.product)
    // respond to succesful `create` with status 201 and JSON of new "gemstone"
    .then(product => {
      res.status(201).json({ product: product.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

module.exports = router
