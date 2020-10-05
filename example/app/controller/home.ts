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
    const err = await ctx.validate(Post);
    ctx.logger.error(err);
    ctx.body = err;
  }

  public async testg() {
    const { ctx } = this;
    const err = await ctx.validate(Id, ctx.request.query);
    ctx.logger.error(err);
    ctx.body = err;
  }
}
