# midway 实践

项目概述，主要是为了记录和沉淀对`midway`框架的理解和实践。



## 相关文档

[midway-语雀](https://www.yuque.com/midwayjs/midway_v2/introduction)

[typeorm-数据 orm](https://typeorm.io/#/)

[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)



## 开发项目

#### 环境要求

- Mysql
- node

#### 数据库

提供了 init.sq 文件，初始化数据库，并且修改 config 的相关配置即可

```bash
# Development
$ npm i
$ npm run dev
$ open http://localhost:7001/

# Deploy
$ npm start
$ npm stop
```



### 控制器 controller

- 注册接口的 url 地址
- 参数的检验
- 调用服务，返回结果

```typescript
  @Post('/create')
  @Validate()
  async create(@Body(ALL) params: CreateDTO) {
    const result = await this.adminUserService.createUser(params);
    this.ctx.helper.success(result);
  }
```



### 参数检验 DTO

参数检验有多种方式，但是 DTO 加装饰器的方案，比较复用和解藕。

```typescript
export class CreateDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.number().required())
  roleId: number;
}
```



### 服务 service

- 调用数据库 CURD
- 每个函数都应该返回结果

```typescript
  async createUser(params: CreateDTO) {
    const user = new AdminUser();
    const role = new AdminRole();

    role.id = params.roleId;
    user.role = role;
    this.adminUserModel.merge(user, params);

    return await this.adminUserModel.save(user);
  }
```



### 数据模型 model

- 数据库表的设计是开发的核心要点，开发功能点前，表的设计从多种维度考虑，字段名称定义后不易再修改

```typescript
@EntityModel({
  name: 'admin_user',
})
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    select: false,
    comment: '密码',
  })
  password: string;
}
```



### 结果统一处理

- 成功结果，统一调用`helper.success`即可，数据结构为`{code, data,message}`
- 异常处理，统一调用`throw helper.error`，程序会中断，异常会被全局的中间件捕获，返回的数据结构为`{code,message,details?}`，网络状态为 500。



### jwt 权限中间件

- 调用登录接口，返回`token`，信息包括`roleId,userId`
- 中间件在`headers,query,body`中获取`token`，解析 token，把信息存储在 ctx 中，程序就可以直接在 ctx 中直接获取用户信息。



### api 权限中间件

- 使用方式，注册路由中，传递一个中间件的函数
- 对比方法需要的权限和当前角色的权限

```typescript
  @Del('/remove', { middleware: [apiAuth(['AdminUser:remove']) as any] })
  @Validate()
  async remove(@Body(ALL) params: RemoveDTO) {
    const { id } = params;
    const result = await this.adminUserService.removeUserById(id);
    return result;
  }
```



1