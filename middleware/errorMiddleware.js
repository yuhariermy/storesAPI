const _ = require('lodash')
function routeErrorHandler(err, req, res, next) {
  const parsedError = _.toPlainObject(err)
  if (parsedError.code === 'ER_BAD_FIELD_ERROR')
    res.status(400).send('Bad request, wrong key name');
  else if (parsedError.code === 'ER_DATA_TOO_LONG')
    res.status(400).send('Bad request, data too long');
  else if (parsedError.code === 'ERR_NOT_FOUND')
    res.status(401).send('Not found');
  else
    res.status(500).send(parsedError)
}

module.exports = routeErrorHandler