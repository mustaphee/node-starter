const { pick } = require('lodash');
const { successResponse, errorResponse } = require('../utils/responses');
const { User } = require('../models/user.model');


class TestController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.logger = dependencies.logger;
    this.createUser = this.createUser.bind(this);
    this.test = this.test.bind(this);
  }

  // TODO: async Handler to eliminate TRY/CATCH BLOCK
  async createUser(req, res, next) {
    const { email } = req.validated;
    try {
      const userExists = await User.findOne({ email }).lean();
      if (userExists) return errorResponse(res, 400, `${email} already exists`, 'User already exists');
      const savedUser = await User.create(req.validated);
      this.logger.info(`User with email ${email} created successfully.`);
      return successResponse(res, pick(savedUser, ['_id', 'full_name', 'email', 'phone_number', 'status']),
        `User with email ${email} created successfully.`);
    } catch (err) {
      this.logger.error(`An error occurred while attempting to create user: ${email}`);
      return next(err);
    }
  }

  async test(req, res, next) {
    try {
      this.logger.info(req.validated.message);
      return successResponse(res, 200, req.validated, `Echo...${req.validated.message}`);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = TestController;
