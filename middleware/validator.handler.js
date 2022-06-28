function validatorHandler(schema, property) {
  return (req, res, next) => {
    console.log("hola?")
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      //Aca deberia tratar el error
      console.log("hay error")
    }
    next();
  }
}

module.exports = validatorHandler;