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
    // 会获得具体的类型
    const p = await ctx.validate<Post>(Post);
    this.ctx.logger.info(p);
    ctx.body = p;
  }

  public async testg() {
    const { ctx } = this;
    const dto = await ctx.validate(Id, ctx.request.query);
    this.ctx.logger.info(dto);
    ctx.body = 'success';
  }
}
```

> `ctx.validate`会将传入的校验数据对象转换成`Type`指定的类型，指定范型可以更友好的使用类型。
>
> 已经在Application对象上挂载了validator属性，即`class-validator`的Validator。可以在该属性扩展更多schema等。
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

## 获取Query值为String类型问题

在处理`Get`的请求中获取的`query`参数都是String类型，那么定义Dto的时候就无法直接使用`@IsInt`注解，只能使用`@IsNumberString`来做参数验证。这里提供一个思路来提前将Query的参数转换需要的类型。

**DTO定义**

``` typescript
import { Expose, Transform } from 'class-transformer';
import {
    IsNumberString,
    IsInt,
  } from 'class-validator';

export class Id {

  @IsNumberString()
  @Expose()
  sid: string;

  @IsInt()
  @Transform(value => { return parseInt(value) }, { toClassOnly: true })
  @Expose()
  id: number;

}
```

> 重点是`class-transformer`的`@Transform`注解。
>
> 这里需要理解框架处理的顺序，当使用`ctx.validate`方法时，
>
> 1、首先使用[class-transformer](https://github.com/typestack/class-transformer)将验证的参数转为成转换成`Type`指定的类型，那么定义的注解就会先执行转换类型。
>
> 2、然后再使用[class-validator](https://github.com/typestack/class-validator)进行参数校验
>
> 更多查看example提供示例

# 有问题或Bug

请提出[issues](https://github.com/hackycy/egg-class-validator/issues)

# License

[MIT](LICENSE)
