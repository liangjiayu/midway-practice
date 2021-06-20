import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
@EntityModel({
  name: 'admin_role',
})
export class AdminRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '角色编码',
  })
  roleCode: string;

  @Column({
    type: 'varchar',
    comment: '角色名称',
  })
  roleName: string;

  @Column({
    type: 'varchar',
    comment: '菜单权限',
    nullable: true,
  })
  menuPerm: string;

  @Column({
    type: 'varchar',
    comment: '接口权限',
    nullable: true,
  })
  apiPerm: string;
}
