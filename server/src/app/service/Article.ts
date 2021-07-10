import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like } from 'typeorm';
import { Context } from 'egg';
import * as assert from 'assert';

import { Article } from '../model/article';
import { CreateDTO, QueryDTO, UpdateDTO } from '../dto/Article';

@Provide()
export class ArticleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Article)
  articleModel: Repository<Article>;

  async createArticle(params: CreateDTO) {
    const article = new Article();
    this.articleModel.merge(article, params);

    return await this.articleModel.save(article);
  }

  async removeArticleById(id: number) {
    const record = await this.articleModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无文章'));

    return await this.articleModel.remove(record);
  }

  async updateArticle(params: UpdateDTO) {
    const { id, ...column } = params;
    const record = await this.articleModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无文章'));

    this.articleModel.merge(record, column);
    return await this.articleModel.save(record);
  }

  async queryArticle(query: QueryDTO) {
    const { pageNum, pageSize, ...filter } = query;
    const where: any = {};

    // 模糊匹配
    if (filter.keyword) {
      where.keyword = Like(`${filter.keyword}%`);
    }

    const [list, total] = await this.articleModel.findAndCount({
      where,
      take: pageSize,
      skip: pageSize * (pageNum - 1),
    });

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }
}
