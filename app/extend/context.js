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
    const originOptions = { validationError: { target: false }, forbidUnknownValues: true, whitelist: true, skipMissingProperties: false, forbidNonWhitelisted: false };
    if (options) {
      Object.assign(originOptions, options);
    }
    const classTransformOptions =
      this.app.config.classValidator
      && this.app.config.classValidator.classTransformOptions ? this.app.config.classValidator.classTransformOptions : { excludeExtraneousValues: true };
    // 增加转换配置，默认开启类型安全
    const instanceCls = plainToClass(type, data, classTransformOptions);
    // return Promise<ValidationError[]>
    const errors = await this.app.validator.validate(instanceCls, originOptions);
    if (errors.length > 0) {
      if (this.app.config.classValidator && this.app.config.classValidator.handleError && this.app.config.classValidator.handleError instanceof Function) {
        // 如果定义了处理错误的函数，则交给定义的函数进行处理
        this.app.config.classValidator.handleError(this, errors);
      } else {
        // 默认实现
        this.throw(422, 'Validation Failed', { errors });
      }
    } else {
      // 返回创建的实例
      return instanceCls;
    }
  },
};
