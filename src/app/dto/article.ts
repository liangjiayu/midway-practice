import { Rule, RuleType } from '@midwayjs/decorator';

export class QueryDTO {
  @Rule(RuleType.number().min(1).max(200).default(10).optional())
  pageSize?: number;

  @Rule(RuleType.number().default(1).optional())
  pageNum?: number;

  @Rule(RuleType.string())
  keyword?: number;
}

export class CreateDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  keyword: string;

  @Rule(RuleType.string().required())
  content: string;
}

export class RemoveDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  title?: string;

  @Rule(RuleType.string())
  keyword?: string;

  @Rule(RuleType.string())
  content?: string;
}
