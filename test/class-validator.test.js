'use strict';

const mock = require('egg-mock');

describe('test/class-validator.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/class-validator-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, classValidator')
      .expect(200);
  });
});
