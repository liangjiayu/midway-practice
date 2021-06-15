import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Context } from 'egg';

import { Article } from '../model/article';
import { CreateDTO, UpdateDTO } from '../dto/article';

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
    return await this.articleModel.remove(record);
  }

  async updateArticle(params: UpdateDTO) {
    const { id, ...column } = params;

    const record = await this.articleModel.findOne(id);

    this.articleModel.merge(record, column);

    return await this.articleModel.save(record);
  }

  async queryArticle(query) {
    const list = await this.articleModel.find();
    return list;
  }
}
