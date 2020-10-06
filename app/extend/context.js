'use strict';
const { plainToClass } = require('class-transformer');

module.exports = {
  /**
   * validate data with options
   * @param  {Object} type - validate target
   * @param  {Object} data - validate data, default to `this.request.body`
   * @param  {Object} options  - validate options object, see [class-validator](https://github.com/typestack/class-validator)
   * @return {Promise} Promise<ValidationError[]> - validate errors
   */
  async validate(type, data, options) {
    data = data || this.request.body;
    options = options || { forbidUnknownValues: true, whitelist: true, skipMissingProperties: false, forbidNonWhitelisted: true };
    // 增加转换配置，默认开启类型安全
    const instanceCls = plainToClass(type, data, this.config.classValidator.classTransformOptions || { excludeExtraneousValues: true });
    // return Promise<ValidationError[]>
    const errors = await this.app.validator.validate(instanceCls, options);
    if (errors.length > 0) {
      this.throw(422, 'Validation Failed', { errors });
    } else {
      // 返回创建的实例
      return instanceCls;
    }
  },
};
