const express = require('express')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.redirect('http://localhost:5173')
  })

module.exports = router