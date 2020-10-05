import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/tp', controller.home.test);
  router.get('/tg', controller.home.testg);
};
