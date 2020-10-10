import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601808743499_8043';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  // 配置 class-transformer options
  config.classValidator = {
    classTransformOptions: {
      // 该配置设置为true会将Dto没有加上@Expose的属性删除掉
      excludeExtraneousValues: false,
    },
    // 自定义错误处理
    handleError: (ctx, _errors) => {
      ctx.logger.error(_errors);
      ctx.throw(422, '参数异常');
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
