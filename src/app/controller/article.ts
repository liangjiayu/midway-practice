import {
  Inject,
  Controller,
  Post,
  Provide,
  Query,
  Get,
  ALL,
  Validate,
  Body,
  Del,
  Put,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { CreateDTO, QueryDTO, RemoveDTO, UpdateDTO } from '../dto/article';
import { ArticleService } from '../service/article';

@Provide()
@Controller('/api/article')
export class ArticleController {
  @Inject()
  ctx: Context;

  @Inject('articleService')
  articleService: ArticleService;

  @Post('/create')
  @Validate()
  async create(@Body(ALL) params: CreateDTO) {
    const result = await this.articleService.createArticle(params);
    this.ctx.helper.success(result);
  }

  @Del('/remove')
  @Validate()
  async remove(@Body(ALL) params: RemoveDTO) {
    const { id } = params;
    const result = await this.articleService.removeArticleById(id);
    return result;
  }

  @Put('/update')
  @Validate()
  async update(@Body(ALL) params: UpdateDTO) {
    const result = await this.articleService.updateArticle(params);
    return result;
  }

  @Get('/query')
  @Validate()
  async query(@Query(ALL) query: QueryDTO) {
    const result = await this.articleService.queryArticle(query);
    return result;
  }
}
