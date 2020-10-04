'use strict';

const { Validator } = require('class-validator');

class AppBootHook {

  constructor(app) {
    this.app = app;
    this.app.validator = new Validator();
  }

}

module.exports = AppBootHook;
