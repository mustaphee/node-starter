const baseValidator = (schema, req, res, next) => {
  // Send error one by one, so i will know if you're doing trial and error
  // so as to kick you out fast with rate limiter
  const { error, value } = schema.validate(req.body);
  if (error) {
    // Send to global Error handler
    const err = new Error(error.details[0].message);
    err.code = 422;
    throw err;
  }
  req.validated = value;
  next();
};

module.exports = baseValidator;
