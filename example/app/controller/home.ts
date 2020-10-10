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
