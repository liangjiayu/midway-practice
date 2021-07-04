import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { AdminUser } from './admin_user';
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
    select: false,
  })
  menuPerm: string;

  @Column({
    type: 'varchar',
    comment: '接口权限',
    nullable: true,
    select: false,
  })
  apiPerm: string;

  @OneToMany(type => AdminUser, user => user.role)
  users: AdminUser[];
}
