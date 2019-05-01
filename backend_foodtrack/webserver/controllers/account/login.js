'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const AccountModel = require('../../../models/account-model');

async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(payload, schema);
}

async function login(req, res, next) {
  /**
   * Validar datos de entrada con Joi
   */
  const accountData = { ...req.body };
  try {
    await validateData(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * Check si existe el usuario en la bbdd
   */
  try {
    const result = await AccountModel.find({ email: accountData.email })

    if(result.length === 1){
      // el result devuelve un array de objetos, donde la posicion cero es el modelo completo
      const userData = result[0];
    if (!userData.verification.verifiedAt) {
      return res.status(403).send();
    }

      /**
       * Paso3: La clave es valida?
       */
      const laPasswordEstaOk = await bcrypt.compare(accountData.password, userData.password);
      if (laPasswordEstaOk === false) { // !laPasswordEstaOk
        return res.status(401).send();
      }

      /**
       * Paso 4: Generar token JWT con uuid + role (admin) asociado al token
       * La duración del token es de 1 minuto (podria ir en variable de entorno)
       */
      const payloadJwt = {
        uuid: userData.uuid,
        role: 'admin', // userData.role si viene de bbdd
      };

      const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      const response = {
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };

      return res.status(200).json(response);
    }

    return res.status(404).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = login;
