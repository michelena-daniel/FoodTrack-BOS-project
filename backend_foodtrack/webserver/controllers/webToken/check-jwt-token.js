'use strict';

const jwt = require('jsonwebtoken');

async function checkJwtToken(req, res, next) {
  /**
   * Validate the JWT token and Header value
   */
  const { authorization } = req.headers;

  if (!authorization) {
    // if there's no authorization in the headers, unauthorized
    return res.status(401).send();
  }

  // .startsWith('JWT ');
  const [prefix, token] = authorization.split(' '); // [JWT, quwrioquwoerquweroqweu]
  if (prefix !== 'JWT') {
    return res.status(401).send();
  }

  if (!token) {
    // if there's no token = unauthorized
    return res.status(401).send();
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);

    if (!decoded) {
      return res.status(401).send();
    }

    req.claims = {
      uuid: decoded.uuid,
      role: decoded.role,
    };

    return next();
  } catch (e) {
    return res.status(401).send();
  }
}

module.exports = checkJwtToken;