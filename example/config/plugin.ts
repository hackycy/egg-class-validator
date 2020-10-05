import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  classValidator: {
    enable: true,
    package: '@hackycy/egg-class-validator',
  }
};

export default plugin;
