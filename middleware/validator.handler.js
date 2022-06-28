const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    error ? boom.badRequest("El formato de los datos ingresados no son validos.") : next();
  }
}

module.exports = validatorHandler;