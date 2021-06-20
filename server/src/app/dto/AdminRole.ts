import { Rule, RuleType } from '@midwayjs/decorator';

export class QueryDTO {}

export class CreateDTO {
  @Rule(RuleType.string().required())
  roleCode: string;

  @Rule(RuleType.string().required())
  roleName: string;
}

export class RemoveDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  roleCode?: string;

  @Rule(RuleType.string())
  roleName?: string;

  @Rule(RuleType.string())
  menuPerm?: string;

  @Rule(RuleType.string())
  apiPerm?: string;
}
