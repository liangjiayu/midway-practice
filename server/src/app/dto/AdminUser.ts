import { Rule, RuleType } from '@midwayjs/decorator';

export class QueryDTO {}

export class CreateDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}

export class RemoveDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  username?: string;

  @Rule(RuleType.string())
  password?: string;
}
