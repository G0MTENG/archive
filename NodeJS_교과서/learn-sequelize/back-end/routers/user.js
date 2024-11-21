const express = require('express')
const router = express.Router()

router.route('/')
  .post((req, res) => {
    console.log(req.body)
  })

module.exports = router
