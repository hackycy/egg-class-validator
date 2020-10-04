'use strict';

module.exports = {
  /**
   * validate data with options
   *
   * @param  {Object} [data] - validate target, default to `this.request.body`
   * @param  {Object} options  - validate rule object, see [parameter](https://github.com/typestack/class-validator)
   * @return {Promise} Promise<ValidationError[]> - validate errors
   */
  validate(data, options = { forbidUnknownValues: true }) {
    data = data || this.request.body;
    return this.app.validator.validate(data, options);
  },
};
