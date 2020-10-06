# egg-class-validator

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@hackycy/egg-class-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@hackycy/egg-class-validator
[download-image]: https://img.shields.io/npm/dm/@hackycy/egg-class-validator.svg?style=flat-square
[download-url]: https://npmjs.org/package/@hackycy/egg-class-validator

<!--
Description here.
-->

基于 [class-validator](https://github.com/typestack/class-validator) 提供数据校验方法。

## 开启插件

```js
// config/plugin.js
exports.classValidator = {
  enable: true,
  package: '@hackycy/egg-class-validator',
};
```

## 定义验证类

``` typescript
import { Expose } from 'class-transformer';
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
  } from 'class-validator';

export class Post {
    @Expose()
    @Length(10, 20)
    title: string;

    @Expose()
    @Contains('hello')
    text: string;

    @Expose()
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsFQDN()
    site: string;

    @Expose()
    @IsDate()
    createDate: Date;
  }
```

## 验证

``` typescript
import { Controller } from 'egg';
import { Id } from '../dto/id';
import { Post } from '../dto/post';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async test() {
    const { ctx } = this;
    // 默认验证body
    // 验证无误会获得具体的类型
    // 否则会抛出异常
    const p = await ctx.validate<Post>(Post);
    ctx.body = 'success';
  }

  public async testg() {
    const { ctx } = this;
    await ctx.validate(Id, ctx.request.query);
    ctx.body = 'success';
  }
}
```

> `ctx.validate`会将传入的校验数据对象转换成`Type`指定的类型的，指定范型可以更友好的使用类型。
>
> 已经在Application对象上挂载了validator属性，即`class-validator`的Validator。
>
> 更多操作可以查看官方的[文档](https://github.com/typestack/class-validator)

转换对象使用了[class-transformer](https://github.com/typestack/class-transformer)，可以在config中配置

``` typescript
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 配置 class-transformer options
  config.classValidator = {
    classTransformOptions: {
      excludeExtraneousValues: false
    }，
    // 自定义错误处理
    handleError: (ctx, _errors) => {
      // 做你想做的事情，第一个参数为Context，第二个参数为ValidationError[]
      ctx.throw(400, '参数异常');
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
```

# 有问题或Bug

请提出[issues](https://github.com/hackycy/egg-class-validator/issues)

# License

[MIT](LICENSE)
