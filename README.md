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

## 有问题或Bug

请提出[issues](https://github.com/hackycy/egg-class-validator/issues)

## License

[MIT](LICENSE)
