const jwt = require('jsonwebtoken')

const token = jwt.sign({ data: 'data test' }, 'Tynytoons1.', {
  expiresIn: 3600
})

const decoded = jwt.verify(token, 'Tynytoons1.')

