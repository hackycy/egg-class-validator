'use strict';
const { plainToClass } = require('class-transformer');

module.exports = {
  /**
   * validate data with options
   * @param  {Object} type - validate target, default to `this.request.body`
   * @param  {Object} data - validate target, default to `this.request.body`
   * @param  {Object} options  - validate options object, see [parameter](https://github.com/typestack/class-validator)
   * @return {Promise} Promise<ValidationError[]> - validate errors
   */
  validate(type, data, options = { forbidUnknownValues: true }) {
    data = data || this.request.body;
    const instanceCls = plainToClass(type, data);
    return this.app.validator.validate(instanceCls, options);
  },
};
